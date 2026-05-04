import { useState, useCallback } from 'react'

const STORAGE_KEY = 'hbs_course_builds'
const DEFAULT_BUILD = { id: 'wishlist', name: 'My Wishlist', createdAt: new Date().toISOString(), courseIds: [] }

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [{ ...DEFAULT_BUILD }]
}

function persist(builds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
}

export function useCourseBuilds() {
  const [builds, setBuilds] = useState(load)

  const update = useCallback((nextOrFn) => {
    setBuilds(prev => {
      const next = typeof nextOrFn === 'function' ? nextOrFn(prev) : nextOrFn
      persist(next)
      return next
    })
  }, [])

  const createBuild = useCallback((name) => {
    const build = {
      id: `build_${Date.now()}`,
      name: name.trim() || 'Untitled Build',
      createdAt: new Date().toISOString(),
      courseIds: [],
    }
    update(prev => [...prev, build])
    return build.id
  }, [update])

  const deleteBuild = useCallback((buildId) => {
    update(prev => prev.filter(b => b.id !== buildId))
  }, [update])

  const renameBuild = useCallback((buildId, name) => {
    update(prev => prev.map(b => b.id === buildId ? { ...b, name: name.trim() || b.name } : b))
  }, [update])

  const addToBuild = useCallback((courseId, buildId) => {
    update(prev => prev.map(b =>
      b.id === buildId && !b.courseIds.includes(courseId)
        ? { ...b, courseIds: [...b.courseIds, courseId] }
        : b
    ))
  }, [update])

  const removeFromBuild = useCallback((courseId, buildId) => {
    update(prev => prev.map(b =>
      b.id === buildId
        ? { ...b, courseIds: b.courseIds.filter(id => id !== courseId) }
        : b
    ))
  }, [update])

  const isInAnyBuild = useCallback((courseId) => {
    return builds.some(b => b.courseIds.includes(courseId))
  }, [builds])

  const getBuildIdsForCourse = useCallback((courseId) => {
    return builds.filter(b => b.courseIds.includes(courseId)).map(b => b.id)
  }, [builds])

  return {
    builds,
    createBuild,
    deleteBuild,
    renameBuild,
    addToBuild,
    removeFromBuild,
    isInAnyBuild,
    getBuildIdsForCourse,
  }
}
