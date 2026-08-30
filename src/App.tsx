import './App.css'
import bush1Url from './assets/bush-1.png'
import bush2Url from './assets/bush-2.png'
import bugSheetUrl from './assets/bugs.png'
import leaf1Url from './assets/leaf-1.png'
import leaf2Url from './assets/leaf-2.png'
import leaf3Url from './assets/leaf-3.png'
import leaf4Url from './assets/leaf-4.png'
import leaf5Url from './assets/leaf-5.png'
import magGlassUrl from './assets/magnifying-glass.png'
import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'

const BUG_CELL_SIZE = 32
const BUG_VISIBLE_WINDOW = BUG_CELL_SIZE - 1
const CRAWL_FRAME_COLS = [4, 5, 6, 7, 8, 9, 10, 11] as const

type CrawlingBug = {
  id: string
  row: number
  x0: string
  x1: string
  x2: string
  y0: string
  y1: string
  y2: string
  r0: string
  r1: string
  r2: string
  duration: string
  delay: string
  facing?: '-1' | '1'
}

type CrawlingBugStyle = CSSProperties & {
  '--sprite-window': string
  '--sprite-scale': string
  '--sprite-x0': string
  '--sprite-x1': string
  '--sprite-x2': string
  '--sprite-x3': string
  '--sprite-x4': string
  '--sprite-x5': string
  '--sprite-x6': string
  '--sprite-x7': string
  '--sprite-y': string
  '--shadow-sprite-y': string
  '--x0': string
  '--x1': string
  '--x2': string
  '--y0': string
  '--y1': string
  '--y2': string
  '--r0': string
  '--r1': string
  '--r2': string
  '--facing': string
  '--crawl-duration': string
  '--crawl-delay': string
}

const bugs: CrawlingBug[] = [
  {
    id: 'yellow-bug',
    row: 0,
    x0: '-38px',
    x1: '210px',
    x2: '446px',
    y0: '28px',
    y1: '68px',
    y2: '24px',
    r0: '98deg',
    r1: '82deg',
    r2: '78deg',
    duration: '18s',
    delay: '-5s',
  },
  {
    id: 'white-bug',
    row: 2,
    x0: '18px',
    x1: '310px',
    x2: '462px',
    y0: '30%',
    y1: '22%',
    y2: '36%',
    r0: '78deg',
    r1: '86deg',
    r2: '112deg',
    duration: '17s',
    delay: '-9s',
  },
  {
    id: 'yellow-bug-2',
    row: 4,
    x0: '-42px',
    x1: '72px',
    x2: '438px',
    y0: '58%',
    y1: '49%',
    y2: '55%',
    r0: '72deg',
    r1: '106deg',
    r2: '82deg',
    duration: '24s',
    delay: '-4s',
  },
  {
    id: 'red-bug',
    row: 6,
    x0: '112%',
    x1: '82%',
    x2: '-36px',
    y0: '42%',
    y1: '34%',
    y2: '46%',
    r0: '-104deg',
    r1: '-86deg',
    r2: '-98deg',
    duration: '19s',
    delay: '-1s',
    facing: '-1',
  },
  {
    id: 'brown-bug',
    row: 8,
    x0: '336px',
    x1: '356px',
    x2: '308px',
    y0: '-42px',
    y1: '32%',
    y2: '106%',
    r0: '174deg',
    r1: '186deg',
    r2: '196deg',
    duration: '23s',
    delay: '-14s',
  },
  {
    id: 'gray-ant',
    row: 10,
    x0: '72px',
    x1: '22px',
    x2: '86px',
    y0: '104%',
    y1: '52%',
    y2: '-34px',
    r0: '-6deg',
    r1: '10deg',
    r2: '4deg',
    duration: '20s',
    delay: '-8s',
  },
  {
    id: 'lady-bug',
    row: 12,
    x0: '420px',
    x1: '160px',
    x2: '-44px',
    y0: '78%',
    y1: '70%',
    y2: '82%',
    r0: '-104deg',
    r1: '-82deg',
    r2: '-112deg',
    duration: '21s',
    delay: '-12s',
    facing: '-1',
  },
  {
    id: 'small-ant',
    row: 14,
    x0: '102%',
    x1: '62%',
    x2: '-32px',
    y0: '91%',
    y1: '94%',
    y2: '88%',
    r0: '-86deg',
    r1: '-96deg',
    r2: '-82deg',
    duration: '16s',
    delay: '-6s',
    facing: '-1',
  },
]

function shiftCoord(value: string, pxDelta: number, percentDelta: number): string {
  if (value.endsWith('%')) {
    return `${Number.parseFloat(value) + percentDelta}%`
  }
  return `${Number.parseFloat(value) + pxDelta}px`
}

function shiftAngle(value: string, degDelta: number): string {
  return `${Number.parseFloat(value) + degDelta}deg`
}

function shiftSeconds(value: string, secDelta: number): string {
  return `${Number.parseFloat(value) + secDelta}s`
}

/** Garden-layer paths: same critters, nudged so they don't twin the card layer. */
const gardenBugs: CrawlingBug[] = bugs.map((bug, index) => {
  const side = index % 2 === 0 ? 1 : -1
  return {
    ...bug,
    id: `garden-${bug.id}`,
    x0: shiftCoord(bug.x0, side * 54, side * 8),
    x1: shiftCoord(bug.x1, side * -38, side * -11),
    x2: shiftCoord(bug.x2, side * 46, side * 7),
    y0: shiftCoord(bug.y0, side * -22, side * 9),
    y1: shiftCoord(bug.y1, side * 28, side * -7),
    y2: shiftCoord(bug.y2, side * -18, side * 10),
    r0: shiftAngle(bug.r0, side * 14),
    r1: shiftAngle(bug.r1, side * -11),
    r2: shiftAngle(bug.r2, side * 9),
    duration: shiftSeconds(bug.duration, side * 3.5),
    delay: shiftSeconds(bug.delay, side * -4.5 - index * 0.7),
    facing: bug.facing === '-1' ? '1' : side === -1 ? '-1' : bug.facing,
  }
})

const leaves = [
  { src: leaf1Url, className: 'leaf leaf--1' },
  { src: leaf2Url, className: 'leaf leaf--2' },
  { src: leaf3Url, className: 'leaf leaf--3' },
  { src: leaf4Url, className: 'leaf leaf--4' },
  { src: leaf5Url, className: 'leaf leaf--5' },
] as const

const bushes = [
  { src: bush1Url, className: 'bush bush--1' },
  { src: bush2Url, className: 'bush bush--2' },
  { src: bush1Url, className: 'bush bush--3' },
  { src: bush2Url, className: 'bush bush--4' },
  { src: bush1Url, className: 'bush bush--5' },
] as const

function getBugStyle(bug: CrawlingBug): CrawlingBugStyle {
  return {
    '--sprite-window': `${BUG_VISIBLE_WINDOW}px`,
    '--sprite-scale': `${BUG_CELL_SIZE / BUG_VISIBLE_WINDOW}`,
    '--sprite-x0': `-${CRAWL_FRAME_COLS[0] * BUG_CELL_SIZE}px`,
    '--sprite-x1': `-${CRAWL_FRAME_COLS[1] * BUG_CELL_SIZE}px`,
    '--sprite-x2': `-${CRAWL_FRAME_COLS[2] * BUG_CELL_SIZE}px`,
    '--sprite-x3': `-${CRAWL_FRAME_COLS[3] * BUG_CELL_SIZE}px`,
    '--sprite-x4': `-${CRAWL_FRAME_COLS[4] * BUG_CELL_SIZE}px`,
    '--sprite-x5': `-${CRAWL_FRAME_COLS[5] * BUG_CELL_SIZE}px`,
    '--sprite-x6': `-${CRAWL_FRAME_COLS[6] * BUG_CELL_SIZE}px`,
    '--sprite-x7': `-${CRAWL_FRAME_COLS[7] * BUG_CELL_SIZE}px`,
    '--sprite-y': `-${bug.row * BUG_CELL_SIZE}px`,
    '--shadow-sprite-y': `-${(bug.row + 1) * BUG_CELL_SIZE}px`,
    '--x0': bug.x0,
    '--x1': bug.x1,
    '--x2': bug.x2,
    '--y0': bug.y0,
    '--y1': bug.y1,
    '--y2': bug.y2,
    '--r0': bug.r0,
    '--r1': bug.r1,
    '--r2': bug.r2,
    '--facing': bug.facing ?? '1',
    '--crawl-duration': bug.duration,
    '--crawl-delay': bug.delay,
    backgroundImage: `url(${bugSheetUrl})`,
  }
}

function BugField({
  className = 'bug-field',
  items = bugs,
  magnifyWithLens,
}: {
  className?: string
  items?: CrawlingBug[]
  magnifyWithLens?: RefObject<HTMLElement | null>
}) {
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!magnifyWithLens) return

    const field = fieldRef.current
    if (!field) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tracks = new WeakMap<
      HTMLElement,
      { x: number; y: number; zoom: number; blur: number; t: number }
    >()
    let frame = 0

    const resetBug = (bug: HTMLElement) => {
      bug.classList.remove('is-in-lens')
      bug.style.setProperty('--lens-zoom', '1')
      bug.style.setProperty('--lens-blur', '0px')
      tracks.delete(bug)
    }

    const tick = () => {
      const lens = magnifyWithLens.current
      const bugsInField = field.querySelectorAll<HTMLElement>('.crawling-bug')

      if (!lens || reducedMotion.matches) {
        bugsInField.forEach(resetBug)
        frame = requestAnimationFrame(tick)
        return
      }

      const now = performance.now()
      const lensBox = lens.getBoundingClientRect()
      const cx = lensBox.left + lensBox.width / 2
      const cy = lensBox.top + lensBox.height / 2
      const radius = Math.min(lensBox.width, lensBox.height) * 0.55
      const inner = radius * 0.72

      bugsInField.forEach((bug) => {
        const box = bug.getBoundingClientRect()
        const bx = box.left + box.width / 2
        const by = box.top + box.height / 2
        const dist = Math.hypot(bx - cx, by - cy)

        let amount = 0
        if (dist <= inner) {
          amount = 1
        } else if (dist < radius) {
          const edge = (radius - dist) / (radius - inner)
          amount = edge * edge * (3 - 2 * edge)
        }

        const targetZoom = 1 + 0.7 * amount
        const targetBlur = 0.9 * amount
        const prev = tracks.get(bug)
        const dt = prev ? Math.max(0.001, (now - prev.t) / 1000) : 1 / 60
        const speed = prev ? Math.hypot(bx - prev.x, by - prev.y) / dt : 40
        // Faster crawls catch the target quicker; slow crawls ease longer.
        const follow = 1 - Math.exp(-dt * (2.2 + speed * 0.05))
        const zoom = prev ? prev.zoom + (targetZoom - prev.zoom) * follow : targetZoom
        const blur = prev ? prev.blur + (targetBlur - prev.blur) * follow : targetBlur

        tracks.set(bug, { x: bx, y: by, zoom, blur, t: now })
        bug.style.setProperty('--lens-zoom', zoom.toFixed(3))
        bug.style.setProperty('--lens-blur', `${blur.toFixed(2)}px`)
        bug.classList.toggle('is-in-lens', amount > 0.02 || zoom > 1.02)
      })

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [magnifyWithLens])

  return (
    <div ref={fieldRef} className={className} aria-hidden="true">
      {items.map((bug) => (
        <span
          className="crawling-bug"
          key={bug.id}
          style={getBugStyle(bug)}
        />
      ))}
    </div>
  )
}

function Foliage() {
  return (
    <div className="foliage" aria-hidden="true">
      {leaves.map((leaf) => (
        <img alt="" className={leaf.className} key={leaf.className} src={leaf.src} />
      ))}
    </div>
  )
}

function Bushes() {
  return (
    <div className="bushes" aria-hidden="true">
      {bushes.map((bush) => (
        <img alt="" className={bush.className} key={bush.className} src={bush.src} />
      ))}
    </div>
  )
}

function App() {
  const lensRef = useRef<HTMLDivElement>(null)

  return (
    <main className="invite-shell">
      <Foliage />
      <BugField className="bug-field bug-field--garden" items={gardenBugs} />
      <section className="invite-card" aria-labelledby="invite-title">
        <header className="invite-header">
          <svg
            aria-label="Buzz, Hop and Crawl"
            className="headline-arc"
            role="img"
            viewBox="0 0 360 70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                d="M 8 54 Q 180 14 352 54"
                fill="none"
                id="headline-curve"
              />
            </defs>
            <text className="headline-arc__text">
              <textPath href="#headline-curve" startOffset="50%" textAnchor="middle">
                Buzz, Hop &amp; Crawl
              </textPath>
            </text>
          </svg>
          <p className="invite-kicker">On over to</p>
          <h1 id="invite-title" className="invite-name">
            Keane&apos;s <span>8th Birthday</span>
          </h1>
        </header>

        <BugField magnifyWithLens={lensRef} />

        <div className="mag-glass-slot">
          <div className="mag-glass">
            <div
              aria-label="Sunday, September 27, 2026 · 2PM"
              className="mag-glass__lens"
              ref={lensRef}
            >
              <p className="lens-day">Sunday</p>
              <p className="lens-date">
                <span>Sep</span>
                <span aria-hidden="true" className="lens-pipe">
                  |
                </span>
                <span className="lens-day-num">27</span>
                <span aria-hidden="true" className="lens-pipe">
                  |
                </span>
                <span>2 PM</span>
              </p>
              <p className="lens-rsvp">
                <span className="lens-rsvp__label">RSVP</span>
                Text back to RSVP for the critter crew.
              </p>
            </div>
            <img
              alt=""
              aria-hidden="true"
              className="mag-glass__img"
              src={magGlassUrl}
            />
          </div>
        </div>
        <p className="swimsuit-note">Don&apos;t forget to bring a swimsuit!</p>
      </section>
      <Bushes />
    </main>
  )
}

export default App
