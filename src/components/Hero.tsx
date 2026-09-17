import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp} from 'react-icons/fa6'
import ParticleBackground from './ParticleBackground'
import './Hero.css'
import ScrollCue from './ScrollCue'

const ROLES = ['Full Stack Developer', 'React.js Specialist', 'MERN Stack Engineer', 'Software Engineer', 'Robotics Specialist']
const ORBIT_TAGS = ['JS', 'Git', 'HTML', 'CSS', 'MongoDB']

const STATS = [
  { label: 'Projects', value: 11, suffix: '+' },
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Passion', value: 100, suffix: '%' },
]

function useTypewriter(words: string[], typingSpeed = 80, pause = 1500) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const delay = deleting ? typingSpeed / 2 : typingSpeed

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setWordIndex((i) => i + 1)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingSpeed, pause])

  return text
}

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame: number
    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return value
}

function StatCounter({ stat, start }: { stat: (typeof STATS)[number]; start: boolean }) {
  const value = useCountUp(stat.value, start)
  return (
    <div className="hero-stat">
      <span className="hero-stat-value">
        {value}
        <span className="hero-stat-suffix">{stat.suffix}</span>
      </span>
      <span className="hero-stat-label">{stat.label}</span>
    </div>
  )
}

export default function Hero() {
  const roleText = useTypewriter(ROLES)
  const [statsInView, setStatsInView] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className="hero">
      <ParticleBackground />

      <div className="hero-content">
        <div className="hero-text">
          <motion.span
            className="hero-pill"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello there,
          </motion.span>

          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            I'm
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="hero-name-texts">
              <span className="hero-name-first">Ajayi</span>
              <span className="hero-name-last">Victor</span>
            </div>

          </motion.h1>

          <h2 className="hero-role">
            <span className="hero-role-slash">// </span>
            {roleText}
            <span className="hero-cursor">|</span>
          </h2>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Passionate <strong>Full Stack Developer</strong>. Started 4 years ago.
            Specialises in the <strong>MERN stack</strong>, strong with{' '}
            <strong>React.js</strong>. Builds fast, responsive, user-friendly
            applications.
          </motion.p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Explore Work <span className="btn-arrow">→</span>
            </a>
            <a href="mailto:victor.ajayi939@gmail.com" className="btn btn-outline">
              Email Me
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/Vickeyjay" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/victor-ajayi-a85a73402"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href="https://x.com/vickeycodes" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://wa.me/2349020274394" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
          </div>

          <div className="hero-stats" ref={statsRef}>
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} start={statsInView} />
            ))}
          </div>
        </div>
      </div>

<div className="hero-portrait-wrap">
  <div className="hero-portrait-frame">
    <div className="hero-badge-ring">
  <svg viewBox="0 0 200 200" className="hero-badge-svg">
    <defs>
      <path
        id="badge-circle"
        d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
      />
    </defs>
    <text className="hero-badge-text">
      <textPath href="#badge-circle">
         AVAILABLE FOR WORK &#x2726; OPEN TO FREELANCE &#x2726;
      </textPath>
    </text>
  </svg>
  <span className="hero-badge-icon">↗</span>
</div>

    <div className="hero-portrait-card">
      <img
        src="/src/assets/profile-cutout.png"
        alt="Ajayi Victor"
        className="hero-portrait-img"
      />
    </div>

    <div className="hero-chip hero-chip-status">
        <span className="status-dot" /> Open to work
    </div>
    <div className="hero-chip hero-chip-top">📍Ilorin, Nigeria</div>
    <div className="hero-chip hero-chip-bottom">4+ Years Exp.</div>
    <div className="hero-chip hero-chip-left">React</div>
    <div className="hero-chip hero-chip-right">Node.js</div>
  </div>

  <div className="hero-orbit">
  {ORBIT_TAGS.map((tag, i) => (
    <span
      key={tag}
      className="orbit-tag"
      style={{ animationDelay: `${(i * -24) / ORBIT_TAGS.length}s` }}
    >
      {tag}
    </span>
  ))}
</div>
</div>

    <ScrollCue />
    </section>
  )
}