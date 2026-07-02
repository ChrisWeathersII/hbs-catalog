import { useState, useEffect, useCallback } from 'react'
import { BookOpen, BookMarked, CalendarDays, Compass, X, ArrowRight, ArrowLeft } from 'lucide-react'

const SEEN_KEY = 'hbs_tour_seen'
export const SHOW_TOUR_EVENT = 'hbs:show-tour'

const STEPS = [
  {
    Icon: BookOpen,
    title: 'Browse every elective',
    body: 'All 124 Fall and Spring electives in one place. Filter by term or day pattern, search by name or professor, and click any course for the full description and meeting times.',
  },
  {
    Icon: BookMarked,
    title: 'Save courses to a Build',
    body: 'A Build is a candidate schedule. Add the courses you’re considering, keep as many builds as you like, and everything saves automatically — with a sync code so you can pick up on another device.',
  },
  {
    Icon: CalendarDays,
    title: 'Rank, schedule, compare',
    body: 'Order your picks on the Ranking page, see them on a weekly calendar in Schedule — time conflicts get flagged — and put two builds side by side in Compare.',
  },
  {
    Icon: Compass,
    title: 'Deadlines & the EC Guide',
    body: 'The Guide covers registration deadlines, cross-registration, and Independent Projects. The countdown pill in the top nav always shows the next hard deadline.',
  },
]

export default function WelcomeTour() {
  const [open, setOpen] = useState(() => {
    try { return !localStorage.getItem(SEEN_KEY) } catch { return false }
  })
  const [step, setStep] = useState(0)

  const dismiss = useCallback(() => {
    try { localStorage.setItem(SEEN_KEY, '1') } catch { /* private mode */ }
    setOpen(false)
  }, [])

  // Allow other parts of the app (e.g. the Guide page) to replay the tour
  useEffect(() => {
    const show = () => { setStep(0); setOpen(true) }
    window.addEventListener(SHOW_TOUR_EVENT, show)
    return () => window.removeEventListener(SHOW_TOUR_EVENT, show)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') dismiss()
      if (e.key === 'ArrowRight') setStep(s => Math.min(s + 1, STEPS.length - 1))
      if (e.key === 'ArrowLeft') setStep(s => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, dismiss])

  if (!open) return null

  const { Icon, title, body } = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <div className="tour__backdrop" onClick={dismiss}>
      <div className="tour" role="dialog" aria-modal="true" aria-label="How to use this site"
        onClick={e => e.stopPropagation()}>
        <button className="tour__close" onClick={dismiss} aria-label="Close tour"><X size={16} /></button>

        <div className="tour__brand">
          <span className="tour__mark">H</span>
          <span className="tour__brand-text">Welcome to <b>HBS Electives</b></span>
        </div>

        <div className="tour__icon"><Icon size={26} strokeWidth={1.8} /></div>
        <h2 className="tour__title">{title}</h2>
        <p className="tour__body">{body}</p>

        <div className="tour__footer">
          <div className="tour__dots" role="tablist" aria-label="Tour steps">
            {STEPS.map((_, i) => (
              <button key={i} className={'tour__dot' + (i === step ? ' is-active' : '')}
                aria-label={`Step ${i + 1}`} onClick={() => setStep(i)} />
            ))}
          </div>
          <div className="tour__actions">
            {step > 0 ? (
              <button className="tour__btn tour__btn--ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <button className="tour__btn tour__btn--ghost" onClick={dismiss}>Skip</button>
            )}
            {last ? (
              <button className="tour__btn tour__btn--primary" onClick={dismiss} autoFocus>
                Get started
              </button>
            ) : (
              <button className="tour__btn tour__btn--primary" onClick={() => setStep(step + 1)} autoFocus>
                Next <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
