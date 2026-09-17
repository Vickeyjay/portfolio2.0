import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 700) {
  // Lazy initial state: the function passed to useState only runs ONCE,
  // on the very first render -- not on every re-render like a plain
  // value would be recomputed. Matters here because matchMedia is a
  // real browser API call, not free.
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)

    function handleChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches)
    }

    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}