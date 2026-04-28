'use client'
import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('pwa-banner-dismissed')) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Small delay so it doesn't pop on first load
      setTimeout(() => setVisible(true), 4000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setVisible(false)
      setDismissed(true)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('pwa-banner-dismissed', '1')
  }

  if (!visible || dismissed) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #071c0f, #0a3d1f)',
        border: '1px solid rgba(255,215,0,0.3)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,215,0,0.1)',
        animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* Gold shimmer top bar */}
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* App icon */}
          <img src="/icons/icon-192.png" alt="App icon"
            className="w-12 h-12 rounded-xl flex-shrink-0"
            style={{ border: '1px solid rgba(255,215,0,0.2)' }} />

          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm" style={{ color: '#ffd700' }}>
              Install Dr. Gideon App
            </p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(187,244,210,0.7)' }}>
              Add to your home screen for instant access and offline use.
            </p>
          </div>

          <button onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <X className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>
        </div>

        <button onClick={handleInstall}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #ffd700, #e6c300)',
            color: '#0a3d1f',
            boxShadow: '0 4px 16px rgba(255,215,0,0.35)',
          }}>
          <Download className="w-4 h-4" />
          Add to Home Screen
        </button>
      </div>
    </div>
  )
}
