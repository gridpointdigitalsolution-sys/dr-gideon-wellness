import Link from 'next/link'
import { Leaf, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffd700, #b87800)' }}>
                <Leaf className="w-5 h-5 text-green-900" />
              </div>
              <div>
                <p className="gold-text font-display font-bold text-lg">Dr. Gideon</p>
                <p className="text-xs text-green-400 tracking-widest uppercase">Afolabi Wellness</p>
              </div>
            </div>
            <p className="text-sm text-green-300 leading-relaxed">
              Your trusted guide to natural herbal remedies, plant wisdom, and holistic wellness solutions rooted in global healing traditions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-yellow-400 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/checker', label: 'Symptom Checker' },
                { href: '/plant-id', label: 'Plant Identifier' },
                { href: '/tracker', label: 'Health Tracker' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-yellow-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-yellow-400 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/encyclopedia', label: 'Herbal Encyclopedia' },
                { href: '/about', label: 'About Dr. Gideon' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-yellow-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-display text-yellow-400 font-semibold mb-4">Important Notice</h4>
            <p className="text-xs text-green-400 leading-relaxed">
              The information on this platform is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before starting any herbal or wellness regimen.
            </p>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-500">
            © {new Date().getFullYear()} Dr. Gideon Afolabi Wellness. All rights reserved.
          </p>
          <p className="text-xs text-green-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400" /> for natural healing
          </p>
        </div>
      </div>
    </footer>
  )
}
