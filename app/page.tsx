'use client'
import Link from 'next/link'
import { Search, Leaf, Activity, BookOpen, ArrowRight, Star, Shield, Globe, Zap, Heart, Brain } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Symptom Checker',
    desc: 'Describe how you feel — in your own words or from our guided list — and get matched to herbal and natural remedies instantly.',
    href: '/checker',
    accent: '#22a050',
    gradient: 'linear-gradient(135deg, #145a2e, #22a050)',
  },
  {
    icon: Leaf,
    title: 'Plant Identifier',
    desc: 'Snap a photo of any plant and discover its medicinal uses, potency, preparation methods, and safety profile.',
    href: '/plant-id',
    accent: '#ffd700',
    gradient: 'linear-gradient(135deg, #b87800, #ffd700)',
  },
  {
    icon: Activity,
    title: 'Health Tracker',
    desc: 'Monitor your wellness journey with visual gauges, symptom severity scores, and remedy progress tracking over time.',
    href: '/tracker',
    accent: '#22a050',
    gradient: 'linear-gradient(135deg, #145a2e, #22a050)',
  },
  {
    icon: BookOpen,
    title: 'Herbal Encyclopedia',
    desc: 'Browse our database of 500+ herbs, supplements, essential oils, and traditional remedies from cultures around the world.',
    href: '/encyclopedia',
    accent: '#ffd700',
    gradient: 'linear-gradient(135deg, #b87800, #ffd700)',
  },
]

const stats = [
  { value: '500+', label: 'Natural Remedies' },
  { value: '100+', label: 'Plants Identified' },
  { value: 'Global', label: 'Healing Traditions' },
  { value: 'Free', label: 'Always & Forever' },
]

const conditions = [
  'Headache', 'Fatigue', 'Insomnia', 'Anxiety', 'Digestion', 'Inflammation',
  'Joint Pain', 'Skin Issues', 'Low Energy', 'Blood Sugar', 'Immune Support', 'Stress',
]

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-forest relative overflow-hidden min-h-screen flex items-center">
        {/* Ambient glow orbs */}
        <div className="absolute top-10 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.06) 0%, transparent 70%)' }} />

        {/* Fine dot grid pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-body tracking-widest uppercase"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)', color: '#ffd700' }}>
                <Leaf className="w-3 h-3" />
                Nature's Intelligence. Modern Precision.
              </div>

              <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Your Natural
                <br />
                <span className="shimmer-gold">Wellness</span>
                <br />
                Advisor
              </h1>

              <p className="text-green-200 text-lg leading-relaxed mb-10 max-w-lg font-body" style={{ opacity: 0.85 }}>
                Describe your symptoms, identify plants, and discover science-backed herbal remedies from global healing traditions — guided by Dr. Gideon Afolabi's expertise.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/checker" className="btn-gold text-base">
                  Check My Symptoms →
                </Link>
                <Link href="/encyclopedia"
                  className="font-body font-semibold text-base transition-all flex items-center gap-2"
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '14px 28px',
                    borderRadius: '50px',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                  }}>
                  Explore Remedies <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick symptom tags */}
              <div>
                <p className="text-xs uppercase tracking-widest mb-3 font-body" style={{ color: 'rgba(255,215,0,0.6)' }}>Quick Check:</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map(c => (
                    <Link key={c} href={`/checker?symptom=${c.toLowerCase()}`}
                      className="px-3 py-1.5 rounded-full text-xs font-body transition-all hover:scale-105"
                      style={{
                        border: '1px solid rgba(34,160,80,0.35)',
                        color: 'rgba(187,244,210,0.8)',
                        background: 'rgba(34,160,80,0.08)',
                      }}>
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Dr. Gideon image with GOLD ORBITING BALLS */}
            <div className="relative flex justify-center items-center py-8 lg:py-16">
              <div className="relative mx-auto" style={{ width: 'clamp(240px, 70vw, 380px)', height: 'clamp(240px, 70vw, 380px)' }}>

                {/* Orbit rings (visual tracks) */}
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    top: '50%', left: '50%',
                    width: 440, height: 440,
                    marginLeft: -220, marginTop: -220,
                    border: '1px solid rgba(255,215,0,0.12)',
                  }} />
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    top: '50%', left: '50%',
                    width: 390, height: 390,
                    marginLeft: -195, marginTop: -195,
                    border: '1px dashed rgba(255,215,0,0.08)',
                  }} />

                {/* ORBIT BALLS — centered at image center */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 10, pointerEvents: 'none' }}>
                  <div className="orbit-ball" />
                  <div className="orbit-ball-2" />
                  <div className="orbit-ball-3" />
                </div>

                {/* Outer glow ring */}
                <div className="absolute rounded-full"
                  style={{
                    inset: -4,
                    background: 'conic-gradient(from 0deg, rgba(255,215,0,0.3), rgba(34,160,80,0.1), rgba(255,215,0,0.3), rgba(34,160,80,0.1), rgba(255,215,0,0.3))',
                    borderRadius: '50%',
                    filter: 'blur(8px)',
                  }} />

                {/* Image circle */}
                <div className="absolute rounded-full overflow-hidden"
                  style={{
                    inset: 8,
                    border: '3px solid rgba(255,215,0,0.4)',
                    boxShadow: '0 0 40px rgba(255,215,0,0.15), inset 0 0 40px rgba(0,0,0,0.3)',
                  }}>
                  <img
                    src="/dr-gideon.jpg"
                    alt="Dr. Gideon Afolabi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.style.background = 'linear-gradient(160deg, #071a0e, #0a3d1f, #145a2e)'
                        parent.style.display = 'flex'
                        parent.style.alignItems = 'center'
                        parent.style.justifyContent = 'center'
                        parent.innerHTML = `
                          <div style="text-align:center">
                            <p style="color:#ffd700;font-size:88px;font-family:serif;font-weight:900;line-height:1;text-shadow:0 0 40px rgba(255,215,0,0.5)">G</p>
                            <p style="color:rgba(255,215,0,0.6);font-size:12px;font-family:sans-serif;letter-spacing:3px;margin-top:4px">DR. GIDEON</p>
                          </div>`
                      }
                    }}
                  />
                </div>

                {/* Name badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-center whitespace-nowrap z-20"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #b87800)',
                    boxShadow: '0 8px 28px rgba(255,215,0,0.45)',
                  }}>
                  <p className="text-green-900 font-display font-bold text-sm">Dr. Gideon Afolabi</p>
                  <p className="text-green-900 text-xs" style={{ opacity: 0.75 }}>Natural Wellness Expert</p>
                </div>

                {/* Floating credential badges — hidden on small screens */}
                <div className="hidden sm:flex absolute -left-12 top-1/4 glass-card px-3 py-2 items-center gap-2"
                  style={{ border: '1px solid rgba(34,160,80,0.3)' }}>
                  <Shield className="w-4 h-4" style={{ color: '#22a050' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">Evidence-Based</span>
                </div>
                <div className="hidden sm:flex absolute -right-12 top-1/3 glass-card px-3 py-2 items-center gap-2"
                  style={{ border: '1px solid rgba(255,215,0,0.3)' }}>
                  <Globe className="w-4 h-4" style={{ color: '#ffd700' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">Global Reach</span>
                </div>
                <div className="hidden sm:flex absolute -right-8 bottom-1/4 glass-card px-3 py-2 items-center gap-2"
                  style={{ border: '1px solid rgba(34,160,80,0.3)' }}>
                  <Star className="w-4 h-4 fill-yellow-400" style={{ color: '#ffd700' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">20+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-4xl text-green-900">{s.value}</p>
                <p className="text-green-800 text-sm font-body mt-1 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-green-600 text-sm uppercase tracking-widest font-body mb-3">Everything You Need</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-green-900 mb-4">
              One Platform. Total Wellness.
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <Link key={f.title} href={f.href}
                className="group relative overflow-hidden rounded-2xl block"
                style={{
                  background: 'white',
                  border: '1px solid rgba(255,215,0,0.18)',
                  boxShadow: '0 4px 28px rgba(10,61,31,0.07)',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                {/* Top gradient accent bar */}
                <div className="h-1 w-full" style={{ background: f.gradient }} />

                {/* Hover glow layer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: f.accent === '#ffd700'
                      ? 'radial-gradient(ellipse at top right, rgba(255,215,0,0.06), transparent 60%)'
                      : 'radial-gradient(ellipse at top right, rgba(34,160,80,0.06), transparent 60%)',
                  }} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: f.gradient,
                        boxShadow: `0 8px 24px ${f.accent}40`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}>
                      <f.icon className="w-7 h-7" style={{ color: f.accent === '#ffd700' ? '#0a3d1f' : 'white' }} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-green-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 font-body leading-relaxed text-sm">{f.desc}</p>

                  <div className="mt-6 pt-5 border-t border-gray-50 flex items-center gap-2"
                    style={{ color: f.accent === '#ffd700' ? '#b87800' : '#22a050' }}>
                    <span className="text-sm font-body font-semibold">Explore feature</span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${f.accent}40, transparent)` }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-24 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Trusted <span className="gold-text">Globally</span>
          </h2>
          <p className="max-w-2xl mx-auto font-body leading-relaxed mb-14" style={{ color: 'rgba(187,244,210,0.7)' }}>
            Dr. Gideon Afolabi Wellness draws from thousands of years of herbal wisdom across African, Asian, European, and American healing traditions — validated by modern research.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: 'Evidence-Based', desc: 'Backed by science' },
              { icon: Globe, label: 'Globally Sourced', desc: '6 healing traditions' },
              { icon: Star, label: 'Expert-Reviewed', desc: '20+ years expertise' },
              { icon: Heart, label: 'Free Forever', desc: 'No subscriptions' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-3 group">
                <div className="w-18 h-18 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    width: 72, height: 72,
                    background: 'rgba(255,215,0,0.08)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    boxShadow: '0 0 0 0 rgba(255,215,0,0)',
                  }}>
                  <item.icon className="w-7 h-7 text-yellow-400" />
                </div>
                <p className="text-white font-body font-semibold text-sm">{item.label}</p>
                <p className="text-xs font-body" style={{ color: 'rgba(187,244,210,0.5)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)' }} className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(10,61,31,0.1)', border: '1px solid rgba(10,61,31,0.15)' }}>
            <Zap className="w-3.5 h-3.5 text-green-900" />
            <span className="text-green-900 text-xs font-body font-semibold uppercase tracking-widest">Instant Results</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-green-800 font-body text-lg mb-10">
            Enter your symptoms and get personalized natural remedy suggestions in seconds. No account needed.
          </p>
          <Link href="/checker" className="btn-green text-base px-12 py-4 inline-block">
            Begin Symptom Check — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
