import { useEffect, useRef } from 'react'

/**
 * Blueprint grid with a cursor spotlight.
 *
 * - A faint engineering-paper grid, with crosshair marks and tiny coordinate
 *   labels at some intersections.
 * - Near the cursor, a brighter copy of the same grid fades in.
 * - Static on touch devices and when the user prefers reduced motion.
 * - Only animates while the spotlight is moving or fading, so it is idle
 *   (zero CPU) the rest of the time.
 *
 * Same file name and default export as before, so imports don't change.
 */

const STEP = 56 // grid spacing in CSS px
const MARK_EVERY = 4 // crosshair on every Nth line
const LABEL_EVERY = 3 // label on every Nth crosshair (diagonal pattern)
const SPOT_RADIUS = 230 // spotlight radius in CSS px
const FOLLOW = 0.14 // how quickly the spotlight catches up with the cursor
const FADE = 0.08 // how quickly the spotlight fades in and out

type Palette = { lines: string; marks: string; labels: string }

// Tuned for .hero-particles { opacity: 0.6 }
const BASE: Palette = {
  lines: 'rgba(232, 235, 239, 0.06)',
  marks: 'rgba(232, 235, 239, 0.22)',
  labels: 'rgba(232, 235, 239, 0.3)',
}
const LIT: Palette = {
  lines: 'rgba(232, 235, 239, 0.22)',
  marks: 'rgba(232, 235, 239, 0.8)',
  labels: 'rgba(232, 235, 239, 0.75)',
}

const pad = (n: number) => String(n).padStart(2, '0')

function paintLayer(w: number, h: number, dpr: number, palette: Palette) {
  const layer = document.createElement('canvas')
  layer.width = Math.round(w * dpr)
  layer.height = Math.round(h * dpr)
  const c = layer.getContext('2d')
  if (!c) return layer
  c.scale(dpr, dpr)

  const cols = Math.ceil(w / STEP)
  const rows = Math.ceil(h / STEP)

  // grid lines
  c.strokeStyle = palette.lines
  c.lineWidth = 1
  c.beginPath()
  for (let col = 0; col <= cols; col++) {
    const x = col * STEP + 0.5
    c.moveTo(x, 0)
    c.lineTo(x, h)
  }
  for (let row = 0; row <= rows; row++) {
    const y = row * STEP + 0.5
    c.moveTo(0, y)
    c.lineTo(w, y)
  }
  c.stroke()

  // crosshairs
  c.strokeStyle = palette.marks
  c.beginPath()
  for (let col = 0; col <= cols; col += MARK_EVERY) {
    for (let row = 0; row <= rows; row += MARK_EVERY) {
      const x = col * STEP + 0.5
      const y = row * STEP + 0.5
      c.moveTo(x - 6, y)
      c.lineTo(x + 6, y)
      c.moveTo(x, y - 6)
      c.lineTo(x, y + 6)
    }
  }
  c.stroke()

  // coordinate labels
  c.fillStyle = palette.labels
  c.font = '10px "JetBrains Mono", ui-monospace, monospace'
  c.textBaseline = 'alphabetic'
  for (let col = 0; col <= cols; col += MARK_EVERY) {
    for (let row = 0; row <= rows; row += MARK_EVERY) {
      const markIndex = col / MARK_EVERY + row / MARK_EVERY
      if (markIndex % LABEL_EVERY !== 0) continue
      c.fillText(`${pad(col)}:${pad(row)}`, col * STEP + 10, row * STEP - 8)
    }
  }

  return layer
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const interactive =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(pointer: fine)').matches

    let dpr = 1
    let w = 0
    let h = 0
    let base: HTMLCanvasElement | null = null
    let lit: HTMLCanvasElement | null = null

    // small offscreen canvas that holds just the spotlight patch
    const mask = document.createElement('canvas')
    const mctx = mask.getContext('2d')

    const mouse = { x: 0, y: 0, active: false }
    const spot = { x: 0, y: 0 }
    let intensity = 0
    let lastClientX = 0
    let lastClientY = 0
    let running = false
    let frame = 0

    function draw() {
      if (!base) return
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(base, 0, 0)

      if (!interactive || !lit || !mctx || intensity < 0.01) return

      const size = Math.round(SPOT_RADIUS * 2 * dpr)
      const sx = Math.round((spot.x - SPOT_RADIUS) * dpr)
      const sy = Math.round((spot.y - SPOT_RADIUS) * dpr)

      mctx.globalCompositeOperation = 'source-over'
      mctx.clearRect(0, 0, size, size)
      mctx.drawImage(lit, sx, sy, size, size, 0, 0, size, size)

      // soft circular falloff
      mctx.globalCompositeOperation = 'destination-in'
      const g = mctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      g.addColorStop(0, 'rgba(0, 0, 0, 1)')
      g.addColorStop(0.5, 'rgba(0, 0, 0, 0.55)')
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')
      mctx.fillStyle = g
      mctx.fillRect(0, 0, size, size)

      ctx!.globalAlpha = intensity
      ctx!.drawImage(mask, sx, sy)
      ctx!.globalAlpha = 1
    }

    function tick() {
      const target = mouse.active ? 1 : 0
      intensity += (target - intensity) * FADE
      spot.x += (mouse.x - spot.x) * FOLLOW
      spot.y += (mouse.y - spot.y) * FOLLOW

      if (!mouse.active && intensity < 0.01) intensity = 0

      draw()

      const settling =
        Math.abs(target - intensity) > 0.01 ||
        (mouse.active && Math.hypot(mouse.x - spot.x, mouse.y - spot.y) > 0.5)

      if (settling) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    function kick() {
      if (running) return
      running = true
      frame = requestAnimationFrame(tick)
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      if (!w || !h) return

      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)

      base = paintLayer(w, h, dpr, BASE)
      lit = interactive ? paintLayer(w, h, dpr, LIT) : null

      const size = Math.round(SPOT_RADIUS * 2 * dpr)
      mask.width = size
      mask.height = size

      draw()
    }

    function update() {
      const rect = canvas!.getBoundingClientRect()
      const x = lastClientX - rect.left
      const y = lastClientY - rect.top
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

      if (inside && !mouse.active) {
        // first contact: start the spotlight right under the cursor
        spot.x = x
        spot.y = y
      }
      mouse.x = x
      mouse.y = y
      mouse.active = inside
      kick()
    }

    function handleMove(e: MouseEvent) {
      lastClientX = e.clientX
      lastClientY = e.clientY
      update()
    }
    function handleLeave(e: MouseEvent) {
      if (e.relatedTarget) return // still inside the window
      mouse.active = false
      kick()
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    // labels use JetBrains Mono; repaint once the font has loaded
    document.fonts?.ready.then(build)

    if (interactive) {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseout', handleLeave)
      window.addEventListener('scroll', update, { passive: true })
    }

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleLeave)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-particles"
      aria-hidden="true"
      style={{
        // fade the grid out toward the edges so it never feels boxed in
        WebkitMaskImage: 'radial-gradient(ellipse at 60% 45%, #000 35%, transparent 90%)',
        maskImage: 'radial-gradient(ellipse at 60% 45%, #000 35%, transparent 90%)',
      }}
    />
  )
}
