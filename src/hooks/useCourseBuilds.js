import { useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'hbs_course_builds'
const SYNC_CODE_KEY = 'hbs_sync_code'
const DEFAULT_BUILD = { id: 'wishlist', name: 'My Wishlist', createdAt: new Date().toISOString(), courseIds: [], sections: {}, notes: {}, colors: {} }

// Migrate old builds that don't have `sections`, `notes`, `colors`, or `ranking` fields
function migrateBuilds(builds) {
  return builds.map(b => ({ ...b, sections: b.sections ?? {}, notes: b.notes ?? {}, colors: b.colors ?? {}, ranking: b.ranking ?? null }))
}

function generateCode() {
  // The sync code is the ONLY thing protecting a user's saved builds (there is
  // no auth), so it must be high-entropy and fixed-length to make enumeration
  // infeasible. crypto.getRandomValues over an unambiguous alphabet, ~82 bits.
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789' // no 0/o/1/l to avoid confusion
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  let out = ''
  for (let i = 0; i < bytes.length; i++) {
    if (i > 0 && i % 4 === 0) out += '-'
    out += alphabet[bytes[i] % alphabet.length]
  }
  return out
}

function loadLocal() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return migrateBuilds(parsed)
    }
  } catch {}
  return [{ ...DEFAULT_BUILD }]
}

function persistLocal(builds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
}

export function useCourseBuilds() {
  const [builds, setBuildsRaw] = useState(loadLocal)
  const [syncCode] = useState(() => {
    let code = localStorage.getItem(SYNC_CODE_KEY)
    if (!code) {
      code = generateCode()
      localStorage.setItem(SYNC_CODE_KEY, code)
    }
    return code
  })
  const [syncStatus, setSyncStatus] = useState('loading')
  const saveTimer = useRef(null)

  // Load from Supabase on mount — cloud is source of truth
  useEffect(() => {
    if (!supabase) { setSyncStatus('offline'); return }
    supabase
      .from('hbs_builds')
      .select('builds')
      .eq('sync_code', syncCode)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) { setSyncStatus('error'); return }
        if (data?.builds && Array.isArray(data.builds) && data.builds.length > 0) {
          const migrated = migrateBuilds(data.builds)
          setBuildsRaw(migrated)
          persistLocal(migrated)
        }
        setSyncStatus('synced')
      })
  }, [syncCode])

  const saveToCloud = useCallback((newBuilds) => {
    if (!supabase) return
    setSyncStatus('syncing')
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from('hbs_builds')
        .upsert({ sync_code: syncCode, builds: newBuilds, updated_at: new Date().toISOString() })
      setSyncStatus(error ? 'error' : 'synced')
    }, 600)
  }, [syncCode])

  const update = useCallback((nextOrFn) => {
    setBuildsRaw(prev => {
      const next = typeof nextOrFn === 'function' ? nextOrFn(prev) : nextOrFn
      persistLocal(next)
      saveToCloud(next)
      return next
    })
  }, [saveToCloud])

  // Enter a sync code from another device to pull its builds
  const linkDevice = useCallback(async (code) => {
    const clean = code.trim().toLowerCase()
    if (!clean || !supabase) return { success: false, error: 'Invalid code' }
    const { data, error } = await supabase
      .from('hbs_builds')
      .select('builds')
      .eq('sync_code', clean)
      .maybeSingle()
    if (error || !data) return { success: false, error: 'Code not found. Make sure you have saved at least one build on the other device first.' }
    const migrated = migrateBuilds(data.builds)
    localStorage.setItem(SYNC_CODE_KEY, clean)
    setBuildsRaw(migrated)
    persistLocal(migrated)
    return { success: true }
  }, [])

  const createBuild = useCallback((name) => {
    const build = {
      id: `build_${Date.now()}`,
      name: name.trim() || 'Untitled Build',
      createdAt: new Date().toISOString(),
      courseIds: [],
      sections: {},
      notes: {},
      colors: {},
    }
    update(prev => [...prev, build])
    return build.id
  }, [update])

  const deleteBuild    = useCallback((id)       => update(prev => prev.filter(b => b.id !== id)), [update])
  const renameBuild    = useCallback((id, name) => update(prev => prev.map(b => b.id === id ? { ...b, name: name.trim() || b.name } : b)), [update])

  const addToBuild = useCallback((courseId, buildId) => {
    update(prev => prev.map(b =>
      b.id === buildId && !b.courseIds.includes(courseId)
        ? { ...b, courseIds: [...b.courseIds, courseId] } : b
    ))
  }, [update])

  const removeFromBuild = useCallback((courseId, buildId) => {
    update(prev => prev.map(b => {
      if (b.id !== buildId) return b
      const { [courseId]: _s, ...sectionsRest } = b.sections ?? {}
      const { [courseId]: _n, ...notesRest    } = b.notes    ?? {}
      const { [courseId]: _c, ...colorsRest   } = b.colors   ?? {}
      const ranking = b.ranking
        ? Object.fromEntries(Object.entries(b.ranking).map(([k, ids]) => [k, ids.filter(id => id !== courseId)]))
        : null
      return {
        ...b,
        courseIds: b.courseIds.filter(id => id !== courseId),
        sections: sectionsRest,
        notes:    notesRest,
        colors:   colorsRest,
        ranking,
      }
    }))
  }, [update])

  // Choose / change which section of a course a build uses
  const setBuildSection = useCallback((buildId, courseId, sectionId) => {
    update(prev => prev.map(b => {
      if (b.id !== buildId) return b
      const next = { ...(b.sections ?? {}) }
      if (sectionId == null) delete next[courseId]
      else next[courseId] = sectionId
      return { ...b, sections: next }
    }))
  }, [update])

  // Override the auto-assigned color for a course within a build. paletteIdx is
  // an integer (index into the PALETTE in ScheduleView) or null/undefined to reset.
  const setBuildCourseColor = useCallback((buildId, courseId, paletteIdx) => {
    update(prev => prev.map(b => {
      if (b.id !== buildId) return b
      const next = { ...(b.colors ?? {}) }
      if (paletteIdx == null) delete next[courseId]
      else next[courseId] = paletteIdx
      return { ...b, colors: next }
    }))
  }, [update])

  // Schedule Scout ranking buckets for a build:
  // { favorite: [courseId...], great: [...], good: [...], acceptable: [...] }
  const setBuildRanking = useCallback((buildId, ranking) => {
    update(prev => prev.map(b => b.id === buildId ? { ...b, ranking } : b))
  }, [update])

  // Per-course free-text note in a build (e.g. "must-take", "backup", "heard great things")
  const setBuildNote = useCallback((buildId, courseId, note) => {
    update(prev => prev.map(b => {
      if (b.id !== buildId) return b
      const next = { ...(b.notes ?? {}) }
      const trimmed = (note ?? '').trim()
      if (!trimmed) delete next[courseId]
      else next[courseId] = trimmed
      return { ...b, notes: next }
    }))
  }, [update])

  const isInAnyBuild       = useCallback((courseId) => builds.some(b => b.courseIds.includes(courseId)), [builds])
  const getBuildIdsForCourse = useCallback((courseId) => builds.filter(b => b.courseIds.includes(courseId)).map(b => b.id), [builds])

  return {
    builds, syncCode, syncStatus, linkDevice,
    createBuild, deleteBuild, renameBuild,
    addToBuild, removeFromBuild, setBuildSection, setBuildNote, setBuildCourseColor, setBuildRanking,
    isInAnyBuild, getBuildIdsForCourse,
  }
}
