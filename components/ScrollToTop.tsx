'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: 'linear-gradient(135deg, #ffd700, #d4a000)',
        boxShadow: '0 8px 28px rgba(255,215,0,0.45), 0 2px 8px rgba(0,0,0,0.18)',
        animation: 'fadeInUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <ArrowUp className="w-5 h-5" style={{ color: '#0a3d1f' }} strokeWidth={2.5} />
    </button>
  )
}
