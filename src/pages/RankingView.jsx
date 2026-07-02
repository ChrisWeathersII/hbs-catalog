import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown, X, Copy, Check, Inbox, GripVertical, Info } from 'lucide-react'
import { COURSES, getCourseSections } from '../data/hbsCourses'

// Schedule Scout prep: drag (or tap) your build's Fall courses into the four
// preference buckets, order them, then mirror the list into Schedule Scout
// when the ranking window opens (Jul 27 – Aug 10).

const BUCKETS = [
  { key: 'favorite',   label: 'Favorite',   cls: 'favorite',   hint: 'Would be thrilled' },
  { key: 'great',      label: 'Great',      cls: 'great',      hint: 'Genuinely excited' },
  { key: 'good',       label: 'Good',       cls: 'good',       hint: 'Happy to take' },
  { key: 'acceptable', label: 'Acceptable', cls: 'acceptable', hint: 'Would still show up' },
]
const EMPTY_RANKING = { favorite: [], great: [], good: [], acceptable: [] }
const BY_ID = new Map(COURSES.map(c => [c.id, c]))

// Clamp a stored ranking to ids that are still in the build & still Fall courses
function normalizeRanking(ranking, validIds) {
  const r = ranking ?? EMPTY_RANKING
  const out = {}
  for (const b of BUCKETS) out[b.key] = (r[b.key] ?? []).filter(id => validIds.has(id))
  return out
}

function CourseRow({ course, overallRank, onMove, onUnrank, onDragStart, onDragOverRow, onDropRow, isDragging }) {
  const sections = getCourseSections(course.id)
  return (
    <li
      className={'brow' + (isDragging ? ' is-dragging' : '')}
      draggable
      onDragStart={e => onDragStart(e, course.id)}
      onDragOver={e => onDragOverRow(e)}
      onDrop={e => onDropRow(e, course.id)}
    >
      <span className="brow__grip"><GripVertical size={13} /></span>
      <span className="brow__rank">{overallRank}</span>
      <span className="brow__body">
        <span className="brow__title">{course.title}</span>
        <span className="brow__meta">
          #{course.number} · {course.credits}cr
          {sections.length > 1 && <em> · {sections.length} sections</em>}
        </span>
      </span>
      <span className="brow__ctrl">
        <button onClick={() => onMove(course.id, -1)} title="Move up" aria-label="Move up"><ArrowUp size={13} /></button>
        <button onClick={() => onMove(course.id, 1)} title="Move down" aria-label="Move down"><ArrowDown size={13} /></button>
        <button onClick={() => onUnrank(course.id)} title="Remove from ranking" aria-label="Remove"><X size={13} /></button>
      </span>
    </li>
  )
}

export default function RankingView({ builds, setBuildRanking }) {
  const [buildId, setBuildId] = useState(() => builds[0]?.id ?? '')
  const [copied, setCopied] = useState(false)
  const [dragId, setDragId] = useState(null)

  const build = builds.find(b => b.id === buildId) ?? builds[0]

  // Scout registration is for Fall — only rank the build's Fall 2026 courses
  const fallCourses = useMemo(() => {
    if (!build) return []
    return build.courseIds.map(id => BY_ID.get(id)).filter(c => c && c.term === 'Fall 2026')
  }, [build])

  const fallIds = useMemo(() => new Set(fallCourses.map(c => c.id)), [fallCourses])
  const ranking = useMemo(() => normalizeRanking(build?.ranking, fallIds), [build, fallIds])
  const rankedIds = useMemo(() => new Set(BUCKETS.flatMap(b => ranking[b.key])), [ranking])
  const unranked = fallCourses.filter(c => !rankedIds.has(c.id))

  // Overall rank number: position across buckets in Favorite→Acceptable order
  const overallRank = useMemo(() => {
    const map = new Map()
    let n = 1
    for (const b of BUCKETS) for (const id of ranking[b.key]) map.set(id, n++)
    return map
  }, [ranking])

  const rankedCredits = BUCKETS.flatMap(b => ranking[b.key])
    .reduce((sum, id) => sum + (BY_ID.get(id)?.credits ?? 0), 0)

  const save = (next) => setBuildRanking(build.id, next)

  // Remove from wherever it is, then insert into `bucketKey` at `index` (end if omitted)
  const assign = (courseId, bucketKey, index = null) => {
    const next = {}
    for (const b of BUCKETS) next[b.key] = ranking[b.key].filter(id => id !== courseId)
    const list = next[bucketKey]
    list.splice(index == null ? list.length : Math.min(index, list.length), 0, courseId)
    save(next)
  }

  const unrank = (courseId) => {
    const next = {}
    for (const b of BUCKETS) next[b.key] = ranking[b.key].filter(id => id !== courseId)
    save(next)
  }

  const move = (courseId, dir) => {
    const bucketKey = BUCKETS.find(b => ranking[b.key].includes(courseId))?.key
    if (!bucketKey) return
    const list = [...ranking[bucketKey]]
    const i = list.indexOf(courseId)
    const j = i + dir
    if (j < 0 || j >= list.length) return
    ;[list[i], list[j]] = [list[j], list[i]]
    save({ ...ranking, [bucketKey]: list })
  }

  // ── drag & drop ──
  const onDragStart = (e, id) => { setDragId(id); e.dataTransfer.effectAllowed = 'move' }
  const onDragOverRow = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }
  const onDropRow = (e, targetId) => {
    e.preventDefault(); e.stopPropagation()
    if (!dragId || dragId === targetId) { setDragId(null); return }
    const bucketKey = BUCKETS.find(b => ranking[b.key].includes(targetId))?.key
    if (bucketKey) {
      const listWithout = ranking[bucketKey].filter(id => id !== dragId)
      assign(dragId, bucketKey, listWithout.indexOf(targetId))
    }
    setDragId(null)
  }
  const onDropBucket = (e, bucketKey) => {
    e.preventDefault()
    if (dragId) assign(dragId, bucketKey)
    setDragId(null)
  }
  const onDropPool = (e) => {
    e.preventDefault()
    if (dragId) unrank(dragId)
    setDragId(null)
  }

  const copyRanking = () => {
    const lines = [`Schedule Scout ranking — ${build.name} (Fall 2026)`, '']
    for (const b of BUCKETS) {
      if (ranking[b.key].length === 0) continue
      lines.push(b.label.toUpperCase())
      for (const id of ranking[b.key]) {
        const c = BY_ID.get(id)
        lines.push(`  ${String(overallRank.get(id)).padStart(2)}. ${c.number}  ${c.title}`)
      }
      lines.push('')
    }
    navigator.clipboard.writeText(lines.join('\n').trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  if (!build) {
    return (
      <div className="page"><div className="wrap">
        <div className="empty" style={{ marginTop: 40 }}>
          <div className="empty__mark"><Inbox /></div>
          <div className="empty__title">No builds yet</div>
          <div className="empty__sub">Save some courses into a build first, then come back to rank them.</div>
          <Link to="/courses" className="empty__btn">Browse the catalog</Link>
        </div>
      </div></div>
    )
  }

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">The Scout <em>Ranking</em></h1>
            <p className="page-head__sub">
              Order your Fall courses into Schedule Scout's four buckets, then mirror the list when the ranking window opens July 27.
            </p>
          </div>
          <div className="page-head__meta">Ranking closes Aug 10 · 6 PM</div>
        </div>
        <div className="rule rule--soft" />

        {/* toolbar */}
        <div className="rank-bar">
          <div className="select">
            <select value={build.id} onChange={e => setBuildId(e.target.value)}>
              {builds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <span className="rank-bar__stat">
            <b>{rankedIds.size}</b> ranked · <b>{rankedCredits}</b> credits
            {unranked.length > 0 && <> · {unranked.length} to go</>}
          </span>
          <button className="rank-copy" onClick={copyRanking} disabled={rankedIds.size === 0}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy ranking'}
          </button>
        </div>

        <p className="rank-tips">
          <Info size={13} />
          Rank in true preference order — Scout is strategy-proof. Select ~2× the credits you need, include every section you'd take, and never rank a course you wouldn't want.
        </p>

        {/* unranked pool */}
        <section className={'rank-pool' + (unranked.length === 0 ? ' is-empty' : '')}
          onDragOver={e => e.preventDefault()} onDrop={onDropPool}>
          <h2 className="rank-pool__title">Unranked · {unranked.length}</h2>
          {unranked.length === 0
            ? <p className="rank-pool__done">Everything's ranked. Drag rows to reorder, or drop one here to bench it.</p>
            : (
              <ul className="rank-pool__list">
                {unranked.map(c => (
                  <li key={c.id} className="prow" draggable onDragStart={e => onDragStart(e, c.id)}>
                    <span className="brow__grip"><GripVertical size={13} /></span>
                    <span className="prow__title">{c.title}</span>
                    <span className="prow__meta">#{c.number}</span>
                    <span className="prow__btns">
                      {BUCKETS.map(b => (
                        <button key={b.key} className={'prow__btn prow__btn--' + b.cls}
                          onClick={() => assign(c.id, b.key)} title={`Add to ${b.label}`}>
                          {b.label === 'Acceptable' ? 'OK' : b.label}
                        </button>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </section>

        {/* buckets */}
        <div className="rank-buckets">
          {BUCKETS.map(b => (
            <section key={b.key} className={'bucket bucket--' + b.cls}
              onDragOver={e => e.preventDefault()} onDrop={e => onDropBucket(e, b.key)}>
              <header className="bucket__head">
                <h3>{b.label}</h3>
                <span>{b.hint}</span>
              </header>
              {ranking[b.key].length === 0
                ? <p className="bucket__empty">Drag courses here</p>
                : (
                  <ul className="bucket__list">
                    {ranking[b.key].map(id => (
                      <CourseRow key={id} course={BY_ID.get(id)}
                        overallRank={overallRank.get(id)}
                        onMove={move} onUnrank={unrank}
                        onDragStart={onDragStart} onDragOverRow={onDragOverRow} onDropRow={onDropRow}
                        isDragging={dragId === id} />
                    ))}
                  </ul>
                )}
            </section>
          ))}
        </div>

        <p className="cal-fineprint">
          Fall 2026 courses only — Spring registration runs separately later in the year · Order within a bucket matters
        </p>
      </div>
    </div>
  )
}
