import './App.css'
import bugSheetUrl from './assets/bugs.png'
import type { CSSProperties } from 'react'

const BUG_CELL_SIZE = 32

type CrawlingBug = {
  id: string
  label: string
  col: number
  row: number
  size: number
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
  '--bug-size': string
  '--sprite-x': string
  '--sprite-y': string
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
}

const bugs: CrawlingBug[] = [
  {
    id: 'bee-loop',
    label: 'busy bumblebee',
    col: 0,
    row: 0,
    size: 34,
    x0: '-38px',
    x1: '210px',
    x2: '446px',
    y0: '28px',
    y1: '68px',
    y2: '24px',
    r0: '8deg',
    r1: '-12deg',
    r2: '6deg',
    duration: '18s',
    delay: '-5s',
  },
  {
    id: 'ladybug-stroll',
    label: 'little ladybug',
    col: 0,
    row: 12,
    size: 30,
    x0: '420px',
    x1: '160px',
    x2: '-44px',
    y0: '78%',
    y1: '70%',
    y2: '82%',
    r0: '-122deg',
    r1: '-100deg',
    r2: '-130deg',
    duration: '21s',
    delay: '-12s',
    facing: '-1',
  },
  {
    id: 'gold-beetle',
    label: 'gold beetle',
    col: 1,
    row: 4,
    size: 32,
    x0: '-42px',
    x1: '72px',
    x2: '438px',
    y0: '58%',
    y1: '49%',
    y2: '55%',
    r0: '76deg',
    r1: '88deg',
    r2: '72deg',
    duration: '24s',
    delay: '-4s',
  },
  {
    id: 'tiny-ant',
    label: 'marching ant',
    col: 0,
    row: 10,
    size: 22,
    x0: '72px',
    x1: '22px',
    x2: '86px',
    y0: '104%',
    y1: '52%',
    y2: '-34px',
    r0: '-8deg',
    r1: '-16deg',
    r2: '4deg',
    duration: '20s',
    delay: '-8s',
  },
  {
    id: 'red-beetle',
    label: 'red beetle',
    col: 2,
    row: 6,
    size: 28,
    x0: '112%',
    x1: '82%',
    x2: '-36px',
    y0: '42%',
    y1: '34%',
    y2: '46%',
    r0: '-84deg',
    r1: '-96deg',
    r2: '-80deg',
    duration: '19s',
    delay: '-1s',
    facing: '-1',
  },
  {
    id: 'pool-bug',
    label: 'water-loving bug',
    col: 0,
    row: 8,
    size: 32,
    x0: '336px',
    x1: '356px',
    x2: '308px',
    y0: '-42px',
    y1: '32%',
    y2: '106%',
    r0: '174deg',
    r1: '188deg',
    r2: '178deg',
    duration: '23s',
    delay: '-14s',
  },
  {
    id: 'silver-critter',
    label: 'silver garden bug',
    col: 1,
    row: 2,
    size: 26,
    x0: '18px',
    x1: '310px',
    x2: '462px',
    y0: '30%',
    y1: '22%',
    y2: '36%',
    r0: '86deg',
    r1: '78deg',
    r2: '93deg',
    duration: '17s',
    delay: '-9s',
  },
  {
    id: 'mini-wanderer',
    label: 'teeny tiny bug',
    col: 0,
    row: 14,
    size: 20,
    x0: '102%',
    x1: '62%',
    x2: '-32px',
    y0: '91%',
    y1: '94%',
    y2: '88%',
    r0: '-90deg',
    r1: '-74deg',
    r2: '-99deg',
    duration: '16s',
    delay: '-6s',
    facing: '-1',
  },
]

function getBugStyle(bug: CrawlingBug): CrawlingBugStyle {
  return {
    '--bug-size': `${bug.size}px`,
    '--sprite-x': `-${bug.col * BUG_CELL_SIZE}px`,
    '--sprite-y': `-${bug.row * BUG_CELL_SIZE}px`,
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
    animationDelay: bug.delay,
    animationDuration: bug.duration,
    backgroundImage: `url(${bugSheetUrl})`,
  }
}

function BugField() {
  return (
    <div className="bug-field" aria-hidden="true">
      {bugs.map((bug) => (
        <span
          className="crawling-bug"
          key={bug.id}
          role="img"
          aria-label={bug.label}
          style={getBugStyle(bug)}
        />
      ))}
    </div>
  )
}

function App() {
  return (
    <main className="invite-shell">
      <BugField />
      <section className="invite-card" aria-labelledby="invite-title">
        <p className="eyebrow">Tiny explorers invited</p>
        <div className="badge">8</div>

        <h1 id="invite-title">
          Keane's
          <span>Bug Bash</span>
        </h1>

        <p className="intro">
          Crawl, buzz, splash, and celebrate as Keane turns eight!
        </p>

        <div className="event-details" aria-label="Party details">
          <div>
            <span className="detail-label">Date</span>
            <strong>Sunday, September 27, 2026</strong>
          </div>
          <div>
            <span className="detail-label">Time</span>
            <strong>2PM</strong>
          </div>
        </div>

        <div className="swimsuit-callout">
          <span className="splash" aria-hidden="true">
            ~
          </span>
          <p>Don't forget to bring a swimsuit!</p>
          <span className="splash" aria-hidden="true">
            ~
          </span>
        </div>

        <p className="closing-note">Text back to RSVP for the critter crew.</p>
      </section>
      <div className="grass" aria-hidden="true" />
    </main>
  )
}

export default App
