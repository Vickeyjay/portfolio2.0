import { useState, useEffect  } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ScrollCue from './ScrollCue'
import './Projects.css'

import edgeledgerImg from '../assets/projects/edgeledger.png'
import fancyImg from '../assets/projects/fancygiftsplace.png'
import hotelImg from '../assets/projects/hotelwebsite.png'
import iemsImg from '../assets/projects/iems.png'
import kekeImg from '../assets/projects/kekecruise.png'
import verseImg from '../assets/projects/verse.png'
import sprintenImg from '../assets/projects/sprinten.png'
import tokoraImg from '../assets/projects/tokora.png'
import verdImg from '../assets/projects/verd.png'
import vickoredeImg from '../assets/projects/vickorede.png'
import zakomImg from '../assets/projects/zakom.png'

import { useIsMobile } from '../hooks/useIsMobile'

const REVEAL_STEP = 5

type Category = 'All' | 'Web' | 'App'

interface Project {
  title: string
  blurb: string
  category: Exclude<Category, 'All'>
  tech: string[]
  image: string
  repo?: string
  live?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Keke Cruise',
    blurb: 'A ride-booking platform connecting passengers with local tricycle (keke) drivers for quick, affordable trips.',
    category: 'App',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: kekeImg,
    repo: 'https://github.com/Vickeyjay/Keke_Cruise',
    live: 'https://keke-cruise.vercel.app/',
  },
  {
    title: 'Verse',
    blurb: 'A logistics and delivery platform for booking, tracking, and managing deliveries across a city in real time.',
    category: 'App',
    tech: ['React', 'Node.js'],
    image: verseImg,
    repo: 'https://github.com/Vickeyjay/verse-logistics-platform-main',
    live: 'https://versehq.netlify.app/',
  },
  {
    title: 'Vickorede Water System',
    blurb: 'A smart water monitoring platform that tracks tank levels in real time, automates pumps, and catches leaks early.',
    category: 'App',
    tech: ['React', 'IoT / Embedded'],
    image: vickoredeImg,
    repo: 'https://github.com/Vickeyjay/Water-Monitoring-System',
    live: 'https://water-management-systems.netlify.app/',
  },
  {
    title: 'IEMS',
    blurb: 'An income and expense management dashboard with visual breakdowns of balance, income, and spending trends.',
    category: 'App',
    tech: ['React', 'Chart.js'],
    image: iemsImg,
    repo: 'https://github.com/Vickeyjay/Income-and-Expense-Management-System',
  },
  {
    title: 'Zakom Medical Diagnostics',
    blurb: 'A diagnostics-center website built around booking appointments and presenting services clearly to patients.',
    category: 'Web',
    tech: ['React', 'Tailwind CSS'],
    image: zakomImg,
    repo: 'https://github.com/Vickeyjay/ZAKOM-Medical-Diagnostics',
    live: 'https://zakomediagnostics.com/',
  },
  {
    title: 'EdgeLedger',
    blurb: 'A finance-services website presenting world-class financial assistance with a clean, confident visual identity.',
    category: 'Web',
    tech: ['React', 'JavaScript', 'CSS'],
    image: edgeledgerImg,
    repo: 'https://github.com/Vickeyjay/EdgeLedger_Website',
    live: 'https://edge-ledger-website-kappa.vercel.app/',
  },
  {
    title: 'Verd',
    blurb: 'A DeFi-powered waitlist landing page for a system designed to help money grow and compound automatically.',
    category: 'Web',
    tech: ['React', 'Tailwind CSS'],
    image: verdImg,
    repo: 'https://github.com/Vickeyjay/Verd',
    live: 'https://verdfinance.com/',
  },
  {
    title: 'Tokora',
    blurb: 'A crypto-powered marketplace concept for local commerce, prioritizing user privacy and secure transactions.',
    category: 'Web',
    tech: ['React', 'Tailwind CSS'],
    image: tokoraImg,
    repo: 'https://github.com/Vickeyjay/Tokora',
    live: 'https://tokora.vercel.app/',
  },
  {
    title: 'Hotel Website',
    blurb: 'A booking-focused website for a hotel, built around clear room listings and a simple reservation flow.',
    category: 'Web',
    tech: ['React', 'CSS'],
    image: hotelImg,
    repo: 'https://github.com/Vickeyjay/Hotel_Website',
    live: 'https://hotel-website-beta-six.vercel.app/',
  },
  {
    title: 'Sprinten',
    blurb: 'A product-design agency site showcasing how complex tech products get simplified into intuitive experiences.',
    category: 'Web',
    tech: ['React', 'Framer Motion'],
    image: sprintenImg,
    repo: 'https://github.com/Vickeyjay/SprintenOfficialApp',
    live: 'https://sprinten-official-app.vercel.app/',
  },
  {
    title: 'FancyGiftsPlace',
    blurb: 'A WooCommerce storefront selling gift and kitchenware products, with a full shop, cart, and checkout flow.',
    category: 'Web',
    tech: ['WordPress', 'WooCommerce'],
    image: fancyImg,
    live: 'https://fancygiftsplace.com/',
  },
]

const FILTERS: Category[] = ['All', 'Web', 'App']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const [visibleCount, setVisibleCount] = useState(REVEAL_STEP)
  const isMobile = useIsMobile(700)

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter)

  useEffect(() => {
    setVisibleCount(REVEAL_STEP)
  }, [activeFilter])

  const visibleProjects = isMobile ? filteredProjects.slice(0, visibleCount) : filteredProjects

  const hasMore = isMobile && visibleCount < filteredProjects.length
  const canRevealLess = isMobile && !hasMore && filteredProjects.length > REVEAL_STEP

  function handleRevealClick() {
    if (hasMore) {
      setVisibleCount((prev) => prev + REVEAL_STEP)
    } else {
      setVisibleCount(REVEAL_STEP)
    }
  }

  return (
    <section id="projects" className="projects">
      <p className="section-kicker">03 — Projects</p>
      <h2 className="projects-heading">Things I've <span className="built">Built</span></h2>

      <div className="projects-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
        <div key={project.title} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="project-image-overlay"
                  aria-label={`View ${project.title} live`}
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>

          <div className="project-card-body">
            <div className="project-tags">
              {project.tech.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>

            <h3>{project.title}</h3>
            <p>{project.blurb}</p>

            <div className="project-actions">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="project-btn project-btn-live">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="project-btn project-btn-repo">
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
                ))}
      </div>

      {(hasMore || canRevealLess) && (
        <button className="reveal-btn" onClick={handleRevealClick}>
          {hasMore ? 'Reveal More' : 'Reveal Less'}
        </button>
      )}

      <a
        href="https://github.com/Vickeyjay"
        target="_blank"
        rel="noreferrer"
        className="btn btn-outline projects-cta"
      >
        See All Projects on GitHub
      </a>

      <ScrollCue />
    </section>
  )
}