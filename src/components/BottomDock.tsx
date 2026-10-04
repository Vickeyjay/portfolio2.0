import { useEffect, useState } from 'react'
import { navLinks } from '../data/navigation'
import { HOME_LINK, NAV_ICONS } from '../data/navIcons'
import './BottomDock.css'

// Same links and icons as the top navbar (shared in data/navIcons.ts)
const ITEMS = [HOME_LINK, ...navLinks]

export default function BottomDock() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(HOME_LINK.href)

  // show the dock only after the page has been scrolled a little
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 20)
      if (window.scrollY < 120) setActive(HOME_LINK.href)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight whichever section is crossing the middle of the screen
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace('#', '')))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY >= 120) {
            setActive(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`dock ${visible ? 'visible' : ''}`}
      aria-label="Section navigation"
    >
      {ITEMS.map((link) => {
        const Icon = NAV_ICONS[link.href]
        const isActive = active === link.href
        const className = `dock-item ${isActive ? 'active' : ''}`
        const content = Icon ? <Icon aria-hidden="true" /> : link.label.charAt(0)

        if (link.href === HOME_LINK.href) {
          return (
            <button
              key={link.href}
              type="button"
              className={className}
              data-label={link.label}
              aria-label={link.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {content}
            </button>
          )
        }

        return (
          <a
            key={link.href}
            href={link.href}
            className={className}
            data-label={link.label}
            aria-label={link.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {content}
          </a>
        )
      })}
    </nav>
  )
}
