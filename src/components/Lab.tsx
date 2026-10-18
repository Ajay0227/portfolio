import { Fragment, useRef } from 'react'
import { motion, useInView, useMotionTemplate, useScroll } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { lab } from '../data/content'
import { EASE } from '../lib/ease'
import { useIsMobile } from '../lib/hooks'
import { useRange } from '../lib/scroll'
import { FadeIn, GiantText } from './ui'
import './Lab.css'

// 3 × 2 grid, same order as xzero: phrases on the top-left/top-middle and
// bottom-middle/bottom-right tiles, the other two carry only the hands.
const TILES = [
  { col: 0, row: 0, phrase: 0 },
  { col: 1, row: 0, phrase: 1 },
  { col: 2, row: 0, phrase: -1 },
  { col: 0, row: 1, phrase: -1 },
  { col: 1, row: 1, phrase: 2 },
  { col: 2, row: 1, phrase: 3 },
] as const

type Tile = (typeof TILES)[number]

function Phrase({ index, bottom }: { index: number; bottom: boolean }) {
  return (
    <p className={`lab__phrase ${bottom ? 'lab__phrase--bottom' : ''}`}>
      <span className="lab__dot" aria-hidden="true" />
      {lab.phrases[index]}
    </p>
  )
}

function TileView({
  tile,
  index,
  progress,
  leftX,
  rightX,
}: {
  tile: Tile
  index: number
  progress: MotionValue<number>
  leftX: MotionValue<string>
  rightX: MotionValue<string>
}) {
  // Tiles rise into place one after another…
  const start = 0.03 + index * 0.065
  const end = start + 0.15
  const y = useRange(progress, [start, end], ['55vh', '0vh'])
  const opacity = useRange(progress, [start, start + 0.06], [0, 1])
  const scale = useRange(progress, [start, end], [0.94, 1])

  // …then the gaps close and the six tiles become one card.
  const gap = useRange(progress, [0.5, 0.6], [6, 0])
  const inner = useRange(progress, [0.5, 0.6], [12, 0])
  const r = (outer: boolean) => (outer ? 12 : inner)
  const tl = r(tile.col === 0 && tile.row === 0)
  const tr = r(tile.col === 2 && tile.row === 0)
  const br = r(tile.col === 2 && tile.row === 1)
  const bl = r(tile.col === 0 && tile.row === 1)
  const clipPath = useMotionTemplate`inset(${gap}px round ${tl}px ${tr}px ${br}px ${bl}px)`

  return (
    <motion.div
      className="lab__tile"
      style={{ gridColumn: tile.col + 1, gridRow: tile.row + 1, y, opacity, scale, clipPath }}
    >
      {/* full-grid stage, offset so each tile shows its own slice of the artwork */}
      <div className="lab__stage" style={{ left: `${-tile.col * 100}%`, top: `${-tile.row * 100}%` }} aria-hidden="true">
        <motion.img className="lab__hand" src={lab.hands.left} alt="" style={{ x: leftX }} />
        <motion.img className="lab__hand" src={lab.hands.right} alt="" style={{ x: rightX }} />
      </div>
      {tile.phrase >= 0 && <Phrase index={tile.phrase} bottom={tile.row === 1} />}
    </motion.div>
  )
}

function MobileHands() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  return (
    <div ref={ref} className="lab__hands-m" aria-hidden="true">
      <motion.img
        src={lab.hands.left}
        alt=""
        initial={{ x: '-14%' }}
        animate={inView ? { x: '-4%' } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <motion.img
        src={lab.hands.right}
        alt=""
        initial={{ x: '14%' }}
        animate={inView ? { x: '4%' } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      />
    </div>
  )
}

export function Lab() {
  const ref = useRef<HTMLElement>(null)
  const mobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const giantY = useRange(enter, [0, 1], ['-30vh', '0vh'])
  const giantBlur = useRange(enter, [0.2, 1], [16, 2])
  const giantFilter = useMotionTemplate`blur(${giantBlur}px)`

  // The hands drift toward each other through the whole sequence (Creation of Adam).
  const leftX = useRange(scrollYProgress, [0.1, 0.95], ['-15%', '-2.5%'])
  const rightX = useRange(scrollYProgress, [0.1, 0.95], ['15%', '2.5%'])

  if (mobile) {
    return (
      <section ref={ref} className="lab lab--static section" data-nav="light" aria-label="Lab">
        <div className="container">
          <GiantText text={lab.giant} className="lab__giant-static" />
          <div className="lab__grid">
            {lab.phrases.map((phrase, i) => (
              <Fragment key={phrase}>
                {i === 2 && <MobileHands />}
                <FadeIn className="lab__card" delay={0.05} y={40}>
                  <Phrase index={i} bottom={false} />
                </FadeIn>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="lab" data-nav="light" aria-label="Lab">
      <div className="lab__sticky">
        <motion.div className="lab__giant container" style={{ y: giantY }}>
          <GiantText text={lab.giant} style={{ filter: giantFilter }} />
        </motion.div>
        <div className="lab__grid">
          {TILES.map((t, i) => (
            <TileView key={i} tile={t} index={i} progress={scrollYProgress} leftX={leftX} rightX={rightX} />
          ))}
        </div>
      </div>
    </section>
  )
}
