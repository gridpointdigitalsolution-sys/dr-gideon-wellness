'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/checker', label: 'Symptom Checker' },
  { href: '/plant-id', label: 'Plant Identifier' },
  { href: '/tracker', label: 'Health Tracker' },
  { href: '/encyclopedia', label: 'Encyclopedia' },
  { href: '/about', label: 'About Dr. Gideon' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav style={{ background: 'linear-gradient(90deg, #052e0f, #0a3d1f)', borderBottom: '1px solid rgba(255,215,0,0.2)' }} className="sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center pulse-gold" style={{ background: 'linear-gradient(135deg, #ffd700, #b87800)' }}>
              <Leaf className="w-5 h-5 text-green-900" />
            </div>
            <div>
              <p className="text-xs text-green-400 font-body tracking-widest uppercase">Dr. Gideon Afolabi</p>
              <p className="gold-text font-display font-bold text-lg leading-tight">Wellness</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-body tracking-wide px-3 py-2 rounded-lg transition-all duration-200 group"
                  style={{
                    color: active ? '#ffd700' : 'rgba(187,244,210,0.85)',
                    background: active ? 'rgba(255,215,0,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: active ? '70%' : '0%',
                      background: 'linear-gradient(90deg, #ffd700, #b87800)',
                      opacity: active ? 1 : 0,
                    }}
                  />
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      width: active ? '0%' : '50%',
                      background: 'rgba(255,215,0,0.4)',
                    }}
                  />
                </Link>
              )
            })}
            <Link href="/checker" className="btn-gold text-sm px-6 py-3 ml-4">
              Get Diagnosis
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-yellow-400 p-2 rounded-lg transition-colors hover:bg-green-900">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: '#052e0f', borderTop: '1px solid rgba(255,215,0,0.15)' }} className="md:hidden px-4 pb-6 pt-2">
          {navLinks.map(link => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 font-body border-b text-sm transition-all"
                style={{
                  color: active ? '#ffd700' : 'rgba(187,244,210,0.85)',
                  borderColor: 'rgba(255,215,0,0.08)',
                }}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#ffd700' }} />
                )}
              </Link>
            )
          })}
          <Link href="/checker" onClick={() => setOpen(false)} className="btn-gold block text-center mt-4 text-sm">
            Get Diagnosis
          </Link>
        </div>
      )}
    </nav>
  )
}
