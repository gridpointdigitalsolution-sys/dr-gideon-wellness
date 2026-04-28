'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const prev = useRef(pathname)

  useEffect(() => {
    if (pathname !== prev.current) {
      prev.current = pathname
      // start bar
      setVisible(true)
      setWidth(0)
      timer.current && clearTimeout(timer.current)

      // quick ramp to 80%
      setTimeout(() => setWidth(30), 50)
      setTimeout(() => setWidth(60), 200)
      setTimeout(() => setWidth(80), 500)

      // complete & hide
      timer.current = setTimeout(() => {
        setWidth(100)
        setTimeout(() => {
          setVisible(false)
          setWidth(0)
        }, 300)
      }, 700)
    }
    return () => { timer.current && clearTimeout(timer.current) }
  }, [pathname])

  if (!visible && width === 0) return null

  return (
    <div
      id="nprogress-bar"
      style={{ width: `${width}%`, opacity: visible ? 1 : 0 }}
    />
  )
}
