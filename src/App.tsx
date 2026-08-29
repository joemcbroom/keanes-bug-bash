import './App.css'
import bush1Url from './assets/bush-1.png'
import bush2Url from './assets/bush-2.png'
import bugSheetUrl from './assets/bugs.png'
import cardTextureUrl from './assets/card-texture.png'
import leaf1Url from './assets/leaf-1.png'
import leaf2Url from './assets/leaf-2.png'
import leaf3Url from './assets/leaf-3.png'
import leaf4Url from './assets/leaf-4.png'
import leaf5Url from './assets/leaf-5.png'
import type { CSSProperties } from 'react'

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

function BugField() {
  return (
    <div className="bug-field" aria-hidden="true">
      {bugs.map((bug) => (
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
  return (
    <main className="invite-shell">
      <Foliage />
      <BugField />
      <section className="invite-card" aria-labelledby="invite-title">
        <span
          aria-hidden="true"
          className="card-texture"
          style={{ backgroundImage: `url(${cardTextureUrl})` }}
        />
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
      <Bushes />
    </main>
  )
}

export default App
