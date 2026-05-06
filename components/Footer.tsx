import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ffd700, #b87800)', boxShadow: '0 4px 14px rgba(255,215,0,0.25)' }}>
                <Leaf className="w-5 h-5 text-green-900" />
              </div>
              <div>
                <p className="gold-text font-display font-bold text-lg leading-tight">Dr. Gideon</p>
                <p className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: 'rgba(255,215,0,0.55)' }}>Afolabi Wellness</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,235,225,0.7)' }}>
              Evidence-led herbal remedies. Drawn from six global healing traditions. Reviewed by a Cornell-trained medicinal plant expert.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#ffd700' }}>Tools</h4>
            <ul className="space-y-2.5 text-sm font-body">
              {[
                { href: '/checker', label: 'Symptom Checker' },
                { href: '/plant-id', label: 'Plant Identifier' },
                { href: '/tracker', label: 'Health Tracker' },
                { href: '/encyclopedia', label: 'Encyclopedia' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-yellow-400" style={{ color: 'rgba(220,235,225,0.78)' }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#ffd700' }}>Background</h4>
            <ul className="space-y-2.5 text-sm font-body">
              <li><Link href="/about" className="transition-colors hover:text-yellow-400" style={{ color: 'rgba(220,235,225,0.78)' }}>About Dr. Gideon</Link></li>
              <li><Link href="/encyclopedia" className="transition-colors hover:text-yellow-400" style={{ color: 'rgba(220,235,225,0.78)' }}>Healing traditions</Link></li>
              <li><Link href="/" className="transition-colors hover:text-yellow-400" style={{ color: 'rgba(220,235,225,0.78)' }}>Home</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#ffd700' }}>Important</h4>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(220,235,225,0.6)' }}>
              Educational use only. Not a substitute for professional medical advice. Speak to a qualified healthcare provider before starting any new remedy.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,215,0,0.10)' }}>
          <p className="text-xs font-body" style={{ color: 'rgba(220,235,225,0.45)' }}>
            © {new Date().getFullYear()} Dr. Gideon Afolabi Wellness. All rights reserved.
          </p>
          <p className="text-xs font-body" style={{ color: 'rgba(220,235,225,0.45)' }}>
            Herbal Wisdom Reviews · Cornell-trained · Globally sourced
          </p>
        </div>
      </div>
    </footer>
  )
}
