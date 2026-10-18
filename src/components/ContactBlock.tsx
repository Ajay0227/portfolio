import { motion } from 'motion/react'
import type { MouseEvent } from 'react'
import { footer, links } from '../data/content'
import { aboutPanel } from '../lib/aboutPanel'
import { Marked } from '../lib/text'
import { ArrowIcon } from './ui'
import { EASE } from '../lib/ease'
import './ContactBlock.css'

type Props = {
  /** Called when an in-page link is clicked (the menu uses it to close itself). */
  onNavigate?: (e: MouseEvent<HTMLAnchorElement>, href: string) => void
  /** Stagger items in (menu) or reveal on scroll (footer). */
  mode: 'menu' | 'footer'
  /** Called before the About panel opens (the menu closes itself). */
  onOpenAbout?: () => void
}

export function ContactBlock({ onNavigate, mode, onOpenAbout }: Props) {
  let i = 0
  const item = () => {
    const delay = 0.15 + i++ * 0.04
    return mode === 'menu'
      ? {
          initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          exit: { opacity: 0, transition: { duration: 0.2 } },
          transition: { duration: 0.8, delay, ease: EASE },
        }
      : {
          initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          // no bottom margin: the last row sits at the very end of the page and must still reveal
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.8, delay: delay * 0.6, ease: EASE },
        }
  }

  return (
    <div className="contact container">
      <div className="contact__grid">
        <div className="contact__intro">
          <motion.p className="small-lead contact__tagline" {...item()}>
            {footer.tagline}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5.25 0h10.5L21 6 10.5 17.25 0 6Z" fill="currentColor" transform="translate(1.5 3.4)" />
            </svg>
          </motion.p>
          <motion.p className="lead contact__statement" {...item()}>
            <Marked text={footer.statement} />
          </motion.p>
        </div>

        <nav className="contact__col" aria-label="Sections">
          <motion.p className="contact__heading" {...item()}>
            Menu
          </motion.p>
          <ul>
            {footer.menu.map((l) => (
              <motion.li key={l.href} {...item()}>
                <a className="contact__link" href={l.href} onClick={(e) => onNavigate?.(e, l.href)}>
                  {l.label} <ArrowIcon />
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="contact__col">
          <motion.p className="contact__heading" {...item()}>
            Elsewhere
          </motion.p>
          <ul>
            <motion.li {...item()}>
              <button
                type="button"
                className="contact__link"
                onClick={() => {
                  onOpenAbout?.()
                  aboutPanel.open()
                }}
                data-cursor="Read more"
              >
                About me <ArrowIcon />
              </button>
            </motion.li>
            {footer.elsewhere.map((l) => (
              <motion.li key={l.href} {...item()}>
                <a className="contact__link" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <ArrowIcon diagonal />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p className="contact__next" {...item()}>
          <Marked text={footer.nextIdea} />
        </motion.p>

        <div className="contact__big">
          <motion.a className="contact__big-link" href={`mailto:${links.email}`} data-cursor="Say hi" {...item()}>
            {links.email}
          </motion.a>
          <motion.a className="contact__big-link" href={links.calendly} target="_blank" rel="noreferrer" data-cursor="Book ↗" {...item()}>
            Book a Call
          </motion.a>
        </div>
      </div>

      <motion.div className="contact__bottom" {...item()}>
        <ul>
          <li>
            <a href={links.resume} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </li>
          <li>
            <a href={links.emailCompose} target="_blank" rel="noreferrer">
              Email Me
            </a>
          </li>
          <li>
            <a href="#top" onClick={(e) => onNavigate?.(e, '#top')}>
              Back to top ↑
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}
