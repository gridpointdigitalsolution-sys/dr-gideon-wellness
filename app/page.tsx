'use client'
import Link from 'next/link'
import { Search, Leaf, Activity, BookOpen, ArrowRight, Star, Shield, Globe, Quote, CheckCircle, ChevronRight } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Symptom Checker',
    desc: 'Describe how you feel — in your own words or from a guided list — and get matched to natural remedies in seconds.',
    href: '/checker',
    accent: '#22a050',
    gradient: 'linear-gradient(135deg, #145a2e, #22a050)',
    badge: 'Most Popular',
    num: '01',
  },
  {
    icon: Leaf,
    title: 'Plant Identifier',
    desc: 'Snap any plant. Discover its medicinal uses, potency, preparation, and safety profile, drawn from global herbal traditions.',
    href: '/plant-id',
    accent: '#ffd700',
    gradient: 'linear-gradient(135deg, #b87800, #ffd700)',
    badge: null,
    num: '02',
  },
  {
    icon: Activity,
    title: 'Health Tracker',
    desc: 'Score yourself across six dimensions of wellness. Get a tailored plan and track how you change week by week.',
    href: '/tracker',
    accent: '#22a050',
    gradient: 'linear-gradient(135deg, #145a2e, #22a050)',
    badge: null,
    num: '03',
  },
  {
    icon: BookOpen,
    title: 'Herbal Encyclopedia',
    desc: '500+ herbs, oils, and remedies from six healing traditions — searchable, filterable, evidence-led.',
    href: '/encyclopedia',
    accent: '#ffd700',
    gradient: 'linear-gradient(135deg, #b87800, #ffd700)',
    badge: null,
    num: '04',
  },
]

const stats = [
  { value: '500+', label: 'Curated Remedies' },
  { value: '6', label: 'Healing Traditions' },
  { value: '20+', label: 'Years of Practice' },
  { value: 'Cornell', label: 'Trained Founder' },
]

const conditions = [
  'Headache', 'Fatigue', 'Insomnia', 'Anxiety', 'Digestion', 'Inflammation',
  'Joint Pain', 'Skin Issues', 'Low Energy', 'Blood Sugar', 'Immune Support', 'Stress',
]

const testimonials = [
  {
    quote: 'I was skeptical at first. Three weeks in, my sleep is the best it has been in a decade. The chamomile and ashwagandha plan worked.',
    name: 'Amaka O.',
    role: 'Lagos, Nigeria',
  },
  {
    quote: 'Used the plant identifier on a leaf in my garden. It was mullein — and the breathing protocol it suggested cleared my chest in days.',
    name: 'Daniel R.',
    role: 'Austin, Texas',
  },
  {
    quote: 'Finally a wellness tool that does not push pills or supplements at me. Just real remedies, prepared the right way.',
    name: 'Priya S.',
    role: 'London, UK',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="bg-forest relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Calmer ambient glow — single soft source */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.06) 0%, transparent 70%)' }} />

        {/* Subtle dot grid (lower opacity, cleaner) */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Text — 7 cols for stronger hierarchy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7 text-[11px] font-body tracking-[0.18em] uppercase"
                style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.22)', color: 'rgba(255,215,0,0.92)' }}>
                <Leaf className="w-3 h-3" />
                Cornell-Trained · Globally Sourced
              </div>

              <h1 className="font-display font-bold text-white leading-[1.05] mb-7"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)', letterSpacing: '-0.025em' }}>
                Natural remedies,<br />
                <span className="shimmer-gold">guided by science</span><br />
                and tradition.
              </h1>

              <p className="font-body mb-10 max-w-xl"
                style={{ color: 'rgba(220,235,225,0.78)', fontSize: 'clamp(1rem, 1.25vw, 1.15rem)', lineHeight: 1.65 }}>
                Tell us how you feel. We match your symptoms to evidence-led herbal remedies from six global healing traditions — instantly, and without the guesswork.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link href="/checker" className="btn-gold text-base">
                  Start free symptom check
                </Link>
                <Link href="/encyclopedia" className="btn-outline-light">
                  Browse the encyclopedia
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust row — replaces "free forever" framing */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 pb-2">
                {[
                  { icon: CheckCircle, label: 'No account required' },
                  { icon: Shield, label: 'Evidence-reviewed' },
                  { icon: Globe, label: 'Used in 40+ countries' },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-2 text-xs font-body" style={{ color: 'rgba(255,215,0,0.85)' }}>
                    <t.icon className="w-3.5 h-3.5" />
                    <span style={{ color: 'rgba(220,235,225,0.7)' }}>{t.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick symptom tags — scrollable on mobile */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] font-body font-semibold" style={{ color: 'rgba(255,215,0,0.55)' }}>Try a quick check</p>
                  <span className="flex items-center gap-1 lg:hidden" style={{ color: 'rgba(255,215,0,0.65)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                    Swipe <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="relative">
                  {/* Right fade overlay — mobile only */}
                  <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none lg:hidden"
                    style={{ background: 'linear-gradient(to left, #071a0e 0%, rgba(7,26,14,0.85) 45%, transparent 100%)' }} />
                  {/* Pulsing chevron */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 pointer-events-none lg:hidden"
                    style={{ animation: 'swipeHintPulse 1.6s ease-in-out infinite' }}>
                    <ChevronRight className="w-4 h-4" style={{ color: '#ffd700' }} />
                  </div>
                  <div className="flex gap-2 lg:flex-wrap overflow-x-auto pb-1 scrollbar-hide"
                    style={{ WebkitOverflowScrolling: 'touch' }}>
                    {conditions.map(c => (
                      <Link key={c} href={`/checker?symptom=${c.toLowerCase()}`}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-body transition-all hover:scale-[1.04] active:scale-95"
                        style={{
                          border: '1px solid rgba(255,215,0,0.22)',
                          color: 'rgba(220,235,225,0.9)',
                          background: 'rgba(255,255,255,0.05)',
                          whiteSpace: 'nowrap',
                        }}>
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dr. Gideon with enhanced premium orbit system */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-6 lg:py-0">
              <div className="orbit-stage relative mx-auto"
                style={{ width: 'clamp(260px, 75vw, 380px)', height: 'clamp(260px, 75vw, 380px)' }}>

                {/* Slow-drifting orbit rings (visual tracks) */}
                <div className="absolute orbit-ring-spin pointer-events-none"
                  style={{
                    top: '50%', left: '50%',
                    width: 'calc(var(--orbit-r) * 2)', height: 'calc(var(--orbit-r) * 2)',
                    marginLeft: 'calc(var(--orbit-r) * -1)', marginTop: 'calc(var(--orbit-r) * -1)',
                    border: '1px solid rgba(255,215,0,0.18)',
                    borderRadius: '50%',
                    boxShadow: '0 0 24px rgba(255,215,0,0.06) inset',
                  }} />
                <div className="absolute orbit-ring-spin-rev pointer-events-none"
                  style={{
                    top: '50%', left: '50%',
                    width: 'calc(var(--orbit-r-outer) * 2)', height: 'calc(var(--orbit-r-outer) * 2)',
                    marginLeft: 'calc(var(--orbit-r-outer) * -1)', marginTop: 'calc(var(--orbit-r-outer) * -1)',
                    border: '1px dashed rgba(255,215,0,0.10)',
                    borderRadius: '50%',
                  }} />

                {/* Conic-glow ambient halo behind portrait */}
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: -14,
                    background: 'conic-gradient(from 0deg, rgba(255,215,0,0.30), rgba(34,160,80,0.05), rgba(255,215,0,0.30), rgba(34,160,80,0.05), rgba(255,215,0,0.30))',
                    borderRadius: '50%',
                    filter: 'blur(14px)',
                    opacity: 0.85,
                  }} />

                {/* Orbit balls + comet trails — anchored to image center */}
                <div className="absolute" style={{ top: '50%', left: '50%', width: 0, height: 0, zIndex: 12, pointerEvents: 'none' }}>
                  <div className="orbit-trail orbit-trail-spin" />
                  <div className="orbit-ball" />
                  <div className="orbit-trail orbit-trail-2 orbit-trail-spin-2" />
                  <div className="orbit-ball-2" />
                  <div className="orbit-trail orbit-trail-3 orbit-trail-spin-3" />
                  <div className="orbit-ball-3" />
                </div>

                {/* Image circle */}
                <div className="absolute rounded-full overflow-hidden"
                  style={{
                    inset: 6,
                    border: '3px solid rgba(255,215,0,0.45)',
                    boxShadow: '0 0 50px rgba(255,215,0,0.20), 0 24px 80px rgba(0,0,0,0.45), inset 0 0 50px rgba(0,0,0,0.28)',
                    zIndex: 5,
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
                            <p style="color:#ffd700;font-size:96px;font-family:serif;font-weight:900;line-height:1;text-shadow:0 0 40px rgba(255,215,0,0.5)">G</p>
                            <p style="color:rgba(255,215,0,0.6);font-size:12px;font-family:sans-serif;letter-spacing:3px;margin-top:8px">DR. GIDEON</p>
                          </div>`
                      }
                    }}
                  />
                </div>

                {/* Name badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-center whitespace-nowrap z-20"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #d4a000)',
                    boxShadow: '0 12px 32px rgba(255,215,0,0.42)',
                  }}>
                  <p className="text-green-900 font-display font-bold text-sm tracking-tight">Dr. Gideon Afolabi</p>
                  <p className="text-green-900 text-[10px] font-body" style={{ opacity: 0.78 }}>Natural Wellness Expert</p>
                </div>

                {/* Floating credential pills */}
                <div className="hidden md:flex absolute -left-10 top-1/4 items-center gap-2 px-3 py-1.5 rounded-full z-20"
                  style={{
                    background: 'rgba(10,30,18,0.70)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34,160,80,0.35)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}>
                  <Shield className="w-3.5 h-3.5" style={{ color: '#52e07f' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">Evidence-Based</span>
                </div>
                <div className="hidden md:flex absolute -right-6 top-8 items-center gap-2 px-3 py-1.5 rounded-full z-20"
                  style={{
                    background: 'rgba(10,30,18,0.70)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,215,0,0.32)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}>
                  <Star className="w-3.5 h-3.5" style={{ color: '#ffd700', fill: '#ffd700' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">Cornell-trained</span>
                </div>
                <div className="hidden md:flex absolute -right-4 bottom-1/4 items-center gap-2 px-3 py-1.5 rounded-full z-20"
                  style={{
                    background: 'rgba(10,30,18,0.70)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34,160,80,0.35)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}>
                  <Globe className="w-3.5 h-3.5" style={{ color: '#52e07f' }} />
                  <span className="text-xs font-body text-white whitespace-nowrap">40+ Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS — high-contrast forest band, bold legible numerals ─── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #071a0e 0%, #0a3d1f 100%)', borderTop: '1px solid rgba(255,215,0,0.18)', borderBottom: '1px solid rgba(255,215,0,0.18)' }}>
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.10), transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-2">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center px-2 md:border-r last:border-r-0"
                style={{ borderColor: i < 3 ? 'rgba(255,215,0,0.18)' : 'transparent' }}>
                <p className="font-display font-extrabold leading-none mb-2.5"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 3.4rem)',
                    background: 'linear-gradient(180deg, #fff5cc 0%, #ffd700 55%, #d4a000 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255,215,0,0.18)',
                    letterSpacing: '-0.02em',
                    filter: 'drop-shadow(0 2px 8px rgba(255,215,0,0.18))',
                  }}>
                  {s.value}
                </p>
                <p className="text-[11px] sm:text-xs font-body uppercase tracking-[0.20em] font-bold" style={{ color: '#ffffff' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.22em] font-body font-semibold mb-3" style={{ color: '#22a050' }}>What's inside</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-green-900 mb-5" style={{ letterSpacing: '-0.025em' }}>
              One platform. Total wellness.
            </h2>
            <p className="font-body text-base max-w-xl mx-auto" style={{ color: '#5b6f5f' }}>
              Four tools, designed to work together — from the first symptom you feel to the long-term plan that keeps you well.
            </p>
            <div className="divider-gold mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((f) => (
              <Link key={f.title} href={f.href}
                className="group relative overflow-hidden block rounded-[24px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f7f4ef 100%)',
                  border: '1.5px solid rgba(34,160,80,0.12)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                }}>

                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: f.accent === '#ffd700'
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.18) 0%, transparent 50%)'
                      : 'linear-gradient(135deg, rgba(34,160,80,0.14) 0%, transparent 50%)',
                  }} />

                {/* Large faded number in background */}
                <div className="absolute bottom-3 right-4 font-display font-black select-none pointer-events-none leading-none"
                  style={{
                    fontSize: '7rem',
                    color: f.accent === '#ffd700' ? 'rgba(184,120,0,0.07)' : 'rgba(34,160,80,0.07)',
                    lineHeight: 1,
                  }}>
                  {f.num}
                </div>

                {/* Accent top stripe */}
                <div className="h-1 w-full rounded-t-[24px]"
                  style={{ background: f.gradient }} />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]"
                        style={{
                          background: f.gradient,
                          boxShadow: `0 12px 32px ${f.accent}50, inset 0 1px 0 rgba(255,255,255,0.30)`,
                          width: '4rem', height: '4rem',
                        }}>
                        <f.icon className="w-8 h-8" style={{ color: f.accent === '#ffd700' ? '#0a3d1f' : 'white' }} />
                      </div>
                      {f.badge && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold uppercase tracking-widest"
                          style={{
                            background: 'linear-gradient(135deg, #145a2e, #22a050)',
                            color: '#ffffff',
                            boxShadow: '0 4px 14px rgba(34,160,80,0.35)',
                          }}>
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: f.accent === '#ffd700'
                          ? 'linear-gradient(135deg, #ffd700, #e6ac00)'
                          : 'linear-gradient(135deg, #22a050, #145a2e)',
                        boxShadow: `0 4px 14px ${f.accent}45`,
                      }}>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        style={{ color: f.accent === '#ffd700' ? '#0a3d1f' : 'white' }} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-green-900 mb-2.5 sm:mb-3"
                    style={{ fontSize: 'clamp(1.35rem, 3vw, 1.65rem)', letterSpacing: '-0.02em' }}>
                    {f.title}
                  </h3>
                  <p className="font-body leading-relaxed text-[14px] sm:text-[15px]" style={{ color: '#5b6f5f' }}>{f.desc}</p>

                  <div className="mt-6 pt-5 flex items-center justify-between"
                    style={{ borderTop: '1px solid rgba(34,160,80,0.10)' }}>
                    <span className="inline-flex items-center gap-1.5 font-body font-bold text-sm"
                      style={{ color: f.accent === '#ffd700' ? '#b87800' : '#22a050' }}>
                      Open {f.title}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                    <span className="text-[10px] font-body font-bold tracking-widest uppercase"
                      style={{ color: 'rgba(0,0,0,0.18)' }}>{f.num}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF / TESTIMONIALS ─── */}
      <section className="py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.22em] font-body font-semibold mb-3" style={{ color: '#b87800' }}>What people say</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-green-900 mb-4" style={{ letterSpacing: '-0.02em' }}>
              Real stories. Real change.
            </h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, i) => {
              const isDark = i === 1
              return (
                <figure key={t.name}
                  className={`relative p-6 sm:p-7 rounded-[22px] overflow-hidden ${isDark ? 'card-dark' : 'wellness-card'}`}
                  style={{ borderRadius: 22 }}>
                  {/* Soft gold corner glow */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none"
                    style={{ background: isDark ? 'radial-gradient(circle, rgba(255,215,0,0.12), transparent 65%)' : 'radial-gradient(circle, rgba(255,215,0,0.10), transparent 65%)' }} />

                  <div className="relative flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="w-3.5 h-3.5" style={{ color: '#ffd700', fill: '#ffd700' }} />
                    ))}
                  </div>

                  <Quote className="relative w-7 h-7 mb-3" style={{ color: isDark ? 'rgba(255,215,0,0.5)' : '#d4a000' }} />
                  <blockquote className="relative font-display italic leading-relaxed mb-6"
                    style={{ color: isDark ? 'rgba(220,235,225,0.94)' : '#0a3d1f', fontSize: 'clamp(1rem, 2.2vw, 1.08rem)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="relative flex items-center gap-3 pt-4"
                    style={{ borderTop: isDark ? '1px solid rgba(255,215,0,0.15)' : '1px solid rgba(184,120,0,0.14)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                      style={{
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(255,215,0,0.22), rgba(255,215,0,0.08))'
                          : 'linear-gradient(135deg, #ffd700, #d4a000)',
                        color: isDark ? '#ffd700' : '#0a3d1f',
                        border: isDark ? '1px solid rgba(255,215,0,0.35)' : 'none',
                      }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm" style={{ color: isDark ? '#ffd700' : '#0a3d1f' }}>{t.name}</p>
                      <p className="font-body text-xs mt-0.5" style={{ color: isDark ? 'rgba(220,235,225,0.6)' : '#7a8a7e' }}>{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── TRUST / TRADITIONS ─── */}
      <section className="py-24 bg-forest-soft relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-xs uppercase tracking-[0.22em] font-body font-semibold mb-3" style={{ color: 'rgba(255,215,0,0.65)' }}>The foundation</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
            Drawing from <span className="gold-text">six healing traditions</span>
          </h2>
          <p className="max-w-2xl mx-auto font-body leading-relaxed mb-14 text-[15px]" style={{ color: 'rgba(220,235,225,0.75)' }}>
            Every remedy is cross-checked against modern research and the lineages that proved it first — African, Ayurvedic, Chinese, Native American, European, and Unani medicine.
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
            {[
              { icon: Shield, label: 'Evidence-reviewed', desc: 'Cross-referenced with peer research' },
              { icon: Globe, label: '6 traditions', desc: 'African to Ayurvedic to Unani' },
              { icon: Star, label: '20+ years', desc: 'Behind every recommendation' },
              { icon: BookOpen, label: '500+ remedies', desc: 'Searchable, filterable, free to read' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-3 group max-w-[180px]">
                <div className="rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    width: 64, height: 64,
                    background: 'rgba(255,215,0,0.06)',
                    border: '1px solid rgba(255,215,0,0.22)',
                  }}>
                  <item.icon className="w-6 h-6" style={{ color: '#ffd700' }} />
                </div>
                <p className="text-white font-body font-semibold text-sm">{item.label}</p>
                <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(220,235,225,0.55)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA — restrained, forest with gold accents ─── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #052e0f 0%, #0a3d1f 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.08), transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.10), transparent 65%)' }} />

        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <p className="text-xs uppercase tracking-[0.22em] font-body font-semibold mb-4" style={{ color: 'rgba(255,215,0,0.7)' }}>Start now</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5" style={{ letterSpacing: '-0.025em' }}>
            Your first remedy is <span className="gold-text">two minutes away.</span>
          </h2>
          <p className="font-body text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(220,235,225,0.78)' }}>
            Tell us how you feel. We'll match it to the right herb, the right preparation, and the right dose. No account, no upsell.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/checker" className="btn-gold text-base px-10 py-4">
              Begin symptom check
            </Link>
            <Link href="/about" className="btn-outline-light">
              Meet Dr. Gideon
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
