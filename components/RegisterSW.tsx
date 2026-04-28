'use client'
import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    // Register on load so it doesn't compete with page resources
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          // Check for updates every 60 min
          setInterval(() => reg.update(), 60 * 60 * 1000)
        })
        .catch(() => {
          // Silently fail — PWA is enhancement, not requirement
        })
    })
  }, [])

  return null
}
