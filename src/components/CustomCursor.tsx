import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      // the dot has no lag -- snap it straight to the cursor every event
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    function handleOver(e: MouseEvent) {
      // e.target comes typed as the generic EventTarget, which doesn't know
      // about .closest(). We're telling TS "trust me, treat this as an
      // HTMLElement" -- that's called a type assertion.
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, textarea')
      ringRef.current?.classList.toggle('cursor-ring-hover', Boolean(isInteractive))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)

    let frame: number
    function animateRing() {
      // "lerp" (linear interpolation): move 15% of the remaining distance
      // toward the mouse, every frame. Small gap closed each time = the
      // classic trailing/lag effect. Raise 0.15 for a snappier ring,
      // lower it for a lazier one.
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      frame = requestAnimationFrame(animateRing)
    }
    animateRing()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}