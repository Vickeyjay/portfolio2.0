import { useEffect, useRef } from 'react'

const REPEL_RADIUS = 110
const REPEL_STRENGTH = 45

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    function resize() {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    resize()
    requestAnimationFrame(resize) // catch the case where layout wasn't settled yet

    const COUNT = 60
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const mouse = { x: -9999, y: -9999 }

    function handleMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function handleLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseout', handleLeave)

    let frame: number
    function draw() {
      ctx!.clearRect(0, 0, width, height)

      // compute each particle's real position AND its fled render position,
      // and keep both -- lines need the fled position too, or they'll look
      // detached from the dots they're supposed to connect
      const rendered = particles.map((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        let drawX = p.x
        let drawY = p.y

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          drawX += (dx / dist) * force * REPEL_STRENGTH
          drawY += (dy / dist) * force * REPEL_STRENGTH
        }

        return { drawX, drawY }
      })

      for (const { drawX, drawY } of rendered) {
        ctx!.beginPath()
        ctx!.arc(drawX, drawY, 1.6, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(96, 165, 250, 0.6)'
        ctx!.fill()
      }

      for (let i = 0; i < rendered.length; i++) {
        for (let j = i + 1; j < rendered.length; j++) {
          const a = rendered[i]
          const b = rendered[j]
          const dist = Math.hypot(a.drawX - b.drawX, a.drawY - b.drawY)
          if (dist < 120) {
            ctx!.beginPath()
            ctx!.arc(a.drawX, a.drawY, 1.6, 0, Math.PI * 2)
            ctx!.arc(b.drawX, b.drawY, 1.6, 0, Math.PI * 2)
            ctx!.moveTo(a.drawX, a.drawY)
            ctx!.lineTo(b.drawX, b.drawY)
            ctx!.fillStyle = 'rgba(145, 70, 240, 0.7)'
            ctx!.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 120})`
            ctx!.lineWidth = 0.6
            ctx!.fill()
            ctx!.stroke()
          }
        }
      }

      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-particles" />
}