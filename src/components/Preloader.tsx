import { useEffect, useRef, useState } from 'react'
import './Preloader.css'

const CODE_SNIPPETS = [
  'const build = async () => {',
  '  await deploy(app)',
  '}',
  'function App() {',
  '  return <Portfolio />',
  '}',
  'npm run build',
  'git commit -m "ship it"',
  'export default Hero',
  'useEffect(() => {...}, [])',
  'const [state, setState] = useState()',
  '<motion.div animate={...} />',
]

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Cosmetic progress counter -- not tied to anything actually loading,
  // just ramps 0 -> 100 over ~2.2s and triggers the fade-out at the end.
  useEffect(() => {
    const start = performance.now()
    const DURATION = 2200

    let frame: number
    function tick(now: number) {
      const elapsed = now - start
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100))
      setProgress(pct)

      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setHidden(true), 400)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Lock page scroll while the preloader is up, restore it on the way out
  useEffect(() => {
    document.body.style.overflow = hidden ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [hidden])

  // Falling-code rain, drawn on canvas -- same reasoning as
  // ParticleBackground: hundreds of glyphs redrawn 60x/second would be far
  // too slow as individually React-rendered DOM elements.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const FONT_SIZE = 16
    const CHARS = '01{}[]()<>/=+-*;:.ABCDEFreactuseState'
    const columns = Math.floor(width / FONT_SIZE)
    // one running vertical position per column -- the classic "rain drop
    // per column" approach
    const drops = Array(columns).fill(0)

    function resize() {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    let frame: number
    function draw() {
      // a translucent fill instead of a full clear is what leaves each
      // falling character's fading trail behind it
      ctx!.fillStyle = 'rgba(6, 8, 15, 0.15)'
      ctx!.fillRect(0, 0, width, height)
      ctx!.font = `${FONT_SIZE}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * FONT_SIZE
        const y = drops[i] * FONT_SIZE

        ctx!.fillStyle = Math.random() > 0.94 ? '#44b0eb' : 'rgba(145, 70, 240, 0.6)'
        ctx!.fillText(char, x, y)

        // once a column scrolls past the bottom, randomly reset it to the
        // top -- randomness keeps columns from all looping in visible sync
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader ${progress >= 100 ? 'preloader-exit' : ''}`}>
      <canvas ref={canvasRef} className="preloader-canvas" />

      <div className="preloader-content">
          <h1 className="preloader-welcome">
                Welcome to Victor's Portfolio<span className="preloader-dot">.</span>
        </h1>

        <div className="preloader-line-percent">
        <p className="preloader-line">
          {CODE_SNIPPETS[Math.floor((progress / 100) * (CODE_SNIPPETS.length - 1))]}
        </p>
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader-percent">{progress}%</p>
      </div> 
        </div>

    </div>
  )
}