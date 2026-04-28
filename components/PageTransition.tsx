'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [stage, setStage] = useState<'idle' | 'exit' | 'enter'>('idle')
  const prev = useRef(pathname)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (pathname !== prev.current) {
      prev.current = pathname
      setStage('exit')
      const t1 = setTimeout(() => {
        setDisplayChildren(children)
        setStage('enter')
      }, 120)
      const t2 = setTimeout(() => setStage('idle'), 460)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div
      style={{
        opacity: stage === 'exit' ? 0 : 1,
        transform: stage === 'exit'
          ? 'translateY(6px)'
          : stage === 'enter'
          ? 'translateY(0)'
          : 'none',
        transition: stage === 'exit'
          ? 'opacity 0.12s ease, transform 0.12s ease'
          : 'opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {displayChildren}
    </div>
  )
}
