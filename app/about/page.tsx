'use client'
import { Shield, Globe, BookOpen, Award, Leaf, Heart, GraduationCap, Church, FlaskConical, Quote, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Cornell University Graduate',
    desc: 'College of Agriculture and Life Sciences, USA. Specialization in Medicinal Plants.',
    color: '#ffd700',
  },
  {
    icon: FlaskConical,
    title: 'PhD Candidate',
    desc: 'Currently pursuing a doctorate in Natural Medicine and Functional Health Management',
    color: '#22a050',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'Serving patients and clients across Africa, Europe, Asia, and the Americas',
    color: '#ffd700',
  },
  {
    icon: BookOpen,
    title: 'Deep Herbal Knowledge',
    desc: '20+ years studying medicinal plants and traditional healing systems worldwide',
    color: '#22a050',
  },
  {
    icon: Church,
    title: 'Reverend & Spiritual Leader',
    desc: 'A pastor who has nurtured souls, now dedicated to nurturing bodies and minds through nature.',
    color: '#ffd700',
  },
  {
    icon: Shield,
    title: 'Evidence-Based Practice',
    desc: 'Integrating traditional wisdom with modern scientific research and validated outcomes',
    color: '#22a050',
  },
]

const traditions = [
  { name: 'African Traditional Medicine', color: '#22a050' },
  { name: 'Ayurvedic Medicine (India)', color: '#ffd700' },
  { name: 'Traditional Chinese Medicine', color: '#22a050' },
  { name: 'Native American Herbalism', color: '#ffd700' },
  { name: 'European Phytotherapy', color: '#22a050' },
  { name: 'Unani Medicine', color: '#ffd700' },
]

const timeline = [
  { year: '2000s', label: 'Began the work', desc: 'Started studying medicinal plants and pastoral care in parallel — two disciplines, one purpose.' },
  { year: '2010s', label: 'Cornell University', desc: 'Specialised in Medicinal Plants at the College of Agriculture and Life Sciences.' },
  { year: '2015+', label: 'Herbal Wisdom Reviews', desc: 'Founded the platform to put trusted herbal guidance in front of anyone with an internet connection.' },
  { year: 'Now', label: 'PhD in progress', desc: 'Completing a doctorate in Natural Medicine while serving clients across four continents.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 100%)' }}>

      {/* ── Hero ── */}
      <div className="encyclopedia-hero py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.55) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.07), transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)', color: 'rgba(255,215,0,0.88)' }}>
                <Star className="w-3 h-3" style={{ fill: 'rgba(255,215,0,0.88)', color: 'rgba(255,215,0,0.88)' }} />
                <span className="text-[11px] font-body uppercase tracking-[0.18em]">About The Expert</span>
              </div>
              <h1 className="font-display font-bold text-white mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                Reverend Dr.<br />
                <span className="shimmer-gold-slow">Gideon Afolabi</span>
              </h1>
              <p className="font-body mb-8 leading-relaxed"
                style={{ color: 'rgba(187,244,210,0.82)', fontSize: 'clamp(1rem,1.3vw,1.15rem)', maxWidth: 480 }}>
                Cornell-trained medicinal plant expert. Pastor. Founder of Herbal Wisdom Reviews. Twenty years connecting global healing traditions to the people who need them.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: GraduationCap, label: 'Cornell University', sub: 'Medicinal Plants' },
                  { icon: Church, label: 'Pastor & Healer', sub: '20+ Years' },
                  { icon: Globe, label: '4 Continents', sub: 'Global Impact' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.18)', backdropFilter: 'blur(8px)' }}>
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#ffd700' }} />
                    <div>
                      <p className="font-body font-semibold text-white text-xs leading-tight">{item.label}</p>
                      <p className="font-body text-[10px]" style={{ color: 'rgba(255,215,0,0.65)' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/checker" className="btn-gold">
                Get a Free Assessment
              </Link>
            </div>

            {/* Image — gradient border animated */}
            <div className="flex justify-center fade-in-up fade-in-up-2">
              <div className="relative mx-auto"
                style={{ width: 'clamp(260px, 55vw, 340px)', height: 'clamp(290px, 62vw, 380px)' }}>
                {/* Animated conic glow */}
                <div className="absolute rounded-2xl pointer-events-none"
                  style={{
                    inset: -4,
                    background: 'conic-gradient(from 0deg, rgba(255,215,0,0.5), rgba(34,160,80,0.12), rgba(255,215,0,0.5), rgba(34,160,80,0.12), rgba(255,215,0,0.5))',
                    filter: 'blur(8px)',
                    borderRadius: 24,
                    animation: 'gradientBorderSpin 3s linear infinite',
                    backgroundSize: '300% 300%',
                  }} />
                {/* Photo frame */}
                <div className="absolute rounded-2xl overflow-hidden"
                  style={{ inset: 6, border: '2px solid rgba(255,215,0,0.4)', boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,215,0,0.12)' }}>
                  <img
                    src="/dr-gideon.jpg"
                    alt="Reverend Dr. Gideon Afolabi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.style.display = 'none'
                      const p = t.parentElement
                      if (p) {
                        p.style.background = 'linear-gradient(160deg, #071a0e, #0a3d1f, #145a2e)'
                        p.style.display = 'flex'
                        p.style.alignItems = 'center'
                        p.style.justifyContent = 'center'
                        p.innerHTML = `<div style="text-align:center"><p style="color:#ffd700;font-size:96px;font-family:serif;font-weight:900;line-height:1;text-shadow:0 0 40px rgba(255,215,0,0.5)">G</p><p style="color:rgba(255,215,0,0.5);font-size:11px;font-family:sans-serif;letter-spacing:4px;margin-top:8px">REV. DR. GIDEON</p></div>`
                      }
                    }}
                  />
                </div>
                {/* Name badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full whitespace-nowrap z-10 text-center"
                  style={{ background: 'linear-gradient(135deg, #ffd700, #b87800)', boxShadow: '0 8px 28px rgba(255,215,0,0.5)' }}>
                  <p className="text-green-900 font-body font-bold text-sm leading-tight">Founder · Herbal Wisdom Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bio Section ── */}
      <div className="py-20 px-4" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label text-green-600 font-body mb-3">The Story</p>
            <h2 className="font-display text-title font-bold text-green-900 mb-4">A Life Dedicated to Healing</h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Bio text */}
            <div className="lg:col-span-3 space-y-6">
              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                <strong className="font-display font-bold text-green-900" style={{ fontSize: '1.15rem' }}>Reverend Dr. Gideon Afolabi</strong>, the visionary founder of Herbal Wisdom Reviews, is a man whose life is a tapestry of deep faith, a profound love for nature, and an unwavering commitment to humanity&apos;s well-being. For over two decades, this passion has not merely simmered in silence but has been a loud call to action that Dr. Afolabi has answered with courage and dedication. As a pastor, he has nurtured souls, and now, with Herbal Wisdom Reviews, he seeks to nurture bodies and minds, guiding people to a deeper understanding and appreciation of the healing virtues that nature holds.
              </p>

              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                As a graduate of the prestigious <strong className="text-green-800">Cornell University, College of Agriculture and Life Sciences</strong>, United States of America, with a specialization in Medicinal Plants, and currently pursuing a PhD in Natural Medicine and Functional Health Management, Dr. Afolabi&apos;s journey began with a vision — a divine insight that has propelled him forward on a mission to reveal the untapped powers of natural remedies.
              </p>

              {/* Pull quote */}
              <blockquote className="relative pl-6 py-2 my-6"
                style={{ borderLeft: '3px solid #ffd700' }}>
                <p className="font-display text-lg italic text-green-900 leading-relaxed">
                  &ldquo;His belief in the sanctity of the natural world and its ability to heal is rooted in a spiritual understanding that everything provided by God has a purpose, including the plants and herbs that have been used for healing since time immemorial.&rdquo;
                </p>
              </blockquote>

              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                His dedication to this cause is not just about advocating for natural remedies but is a call to humanity to reconnect with the environment, to respect it, and to learn from its wisdom. Every recommendation on this platform is reviewed against the lineage that proved it first — and cross-referenced with modern research.
              </p>

              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                The platform is free. There is no upsell, no subscription, and no supplements to buy. The work is funded by the practice; the tools exist so the work can scale.
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Quote card */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #071a0e, #0a3d1f)', border: '1px solid rgba(255,215,0,0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.07), transparent 70%)', transform: 'translate(25%,-25%)' }} />
                <Quote className="w-8 h-8 mb-4" style={{ color: 'rgba(255,215,0,0.35)' }} />
                <p className="font-body text-sm leading-relaxed italic relative" style={{ color: 'rgba(187,244,210,0.9)', fontSize: '0.95rem' }}>
                  Everything provided by God has a purpose, including the plants and herbs used for healing since time immemorial.
                </p>
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,215,0,0.15)' }}>
                  <p className="font-body text-xs font-semibold" style={{ color: '#ffd700', letterSpacing: '0.05em' }}>
                    — Rev. Dr. Gideon Afolabi
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '20+', label: 'Years of Study' },
                  { val: 'Cornell', label: 'University' },
                  { val: '6', label: 'Traditions' },
                  { val: 'Global', label: 'Impact' },
                ].map(s => (
                  <div key={s.label} className="wellness-card card-accent-top p-4 text-center group hover:scale-[1.03] transition-transform duration-300">
                    <p className="font-display font-bold text-2xl shimmer-gold-slow" style={{ letterSpacing: '-0.01em' }}>{s.val}</p>
                    <p className="font-body text-[10px] uppercase tracking-[0.16em] mt-1.5 font-semibold" style={{ color: '#7a5a2e' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="rounded-2xl p-4 space-y-2.5"
                style={{ background: 'linear-gradient(135deg, rgba(34,160,80,0.05), rgba(255,215,0,0.03))', border: '1px solid rgba(34,160,80,0.15)' }}>
                {[
                  { icon: Shield, text: 'Evidence-reviewed recommendations' },
                  { icon: Globe, text: 'Trusted in 40+ countries' },
                  { icon: BookOpen, text: '500+ curated remedies' },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,160,80,0.1)', border: '1px solid rgba(34,160,80,0.2)' }}>
                      <b.icon className="w-3.5 h-3.5" style={{ color: '#22a050' }} />
                    </div>
                    <span className="font-body text-xs text-gray-600">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission — gold band ── */}
      <div className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)' }}>
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(10,61,31,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <Leaf className="w-10 h-10 text-green-900 mx-auto mb-6" style={{ opacity: 0.8 }} />
          <h2 className="font-display text-title font-bold text-green-900 mb-6">The Mission</h2>
          <p className="font-body text-green-800 leading-relaxed"
            style={{ fontSize: '1.15rem', fontStyle: 'italic' }}>
            &ldquo;Make safe, evidence-led natural remedies available to anyone, anywhere — without the supplements industry standing in the way.&rdquo;
          </p>
          <p className="font-body text-green-700 mt-5 font-bold text-sm tracking-wide">— Dr. Gideon Afolabi</p>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #f5f2ed, #f8f6f2)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label text-green-600 font-body mb-3">Career Arc</p>
            <h2 className="font-display text-title font-bold text-green-900 mb-4">The Journey</h2>
            <div className="divider-gold" />
          </div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.45), transparent)' }} />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: i % 2 === 0 ? 'linear-gradient(135deg, #ffd700, #b87800)' : 'linear-gradient(135deg, #145a2e, #22a050)',
                      boxShadow: `0 4px 16px ${i % 2 === 0 ? 'rgba(255,215,0,0.4)' : 'rgba(34,160,80,0.4)'}`,
                    }}>
                    <span className="font-body font-bold text-xs"
                      style={{ color: i % 2 === 0 ? '#0a3d1f' : 'white' }}>{t.year}</span>
                  </div>
                  <div className="wellness-card p-5 flex-1 group-hover:border-yellow-300 transition-colors duration-300">
                    <h3 className="font-display font-bold text-green-900 mb-1.5 text-base">{t.label}</h3>
                    <p className="font-body text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Credentials ── */}
      <div className="py-20 px-4" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label text-green-600 font-body mb-3">Qualifications</p>
            <h2 className="font-display text-title font-bold text-green-900 mb-4">Expertise & Credentials</h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.map(c => (
              <div key={c.title} className="group wellness-card card-accent-top p-6 sm:p-7 flex items-start gap-4 sm:gap-5 interactive-card">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{
                    background: c.color === '#ffd700'
                      ? 'linear-gradient(135deg, #b87800, #ffd700)'
                      : 'linear-gradient(135deg, #145a2e, #22a050)',
                    boxShadow: `0 8px 22px ${c.color}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
                  }}>
                  <c.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: c.color === '#ffd700' ? '#0a3d1f' : 'white' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base sm:text-[17px] font-bold text-green-900 mb-1.5" style={{ letterSpacing: '-0.01em' }}>{c.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#5b6f5f' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Healing Traditions ── */}
      <div className="py-20 px-4 encyclopedia-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-label mb-4 font-body" style={{ color: 'rgba(255,215,0,0.6)' }}>Knowledge Base</p>
          <h2 className="font-display text-title font-bold text-white mb-4">
            Healing <span className="gold-text">Traditions</span> We Draw From
          </h2>
          <p className="font-body mb-12" style={{ color: 'rgba(187,244,210,0.7)', fontSize: '1rem' }}>
            Dr. Gideon Afolabi Wellness synthesizes knowledge from six major global healing traditions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {traditions.map(t => (
              <span key={t.name}
                className="px-5 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-default hover:shadow-lg"
                style={{ background: t.color + '15', border: `1px solid ${t.color}40`, color: t.color, backdropFilter: 'blur(8px)' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #f5f2ed, #f0ece4)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-green-900 mb-4">Ready to begin your healing journey?</h2>
          <p className="font-body text-sm mb-7" style={{ color: '#5b6f5f' }}>
            Start with a free symptom check — no account, no upsell, just nature&apos;s guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/checker" className="btn-gold">Start Free Symptom Check</Link>
            <Link href="/encyclopedia" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3.5 rounded-full"
              style={{ border: '1px solid rgba(10,61,31,0.22)', color: '#0a3d1f', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              Browse Encyclopedia <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="py-12 px-4" style={{ background: '#fffbeb', borderTop: '1px solid #fde68a' }}>
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} />
          <p className="font-body text-sm leading-relaxed" style={{ color: '#92400e' }}>
            <strong>Medical Disclaimer:</strong> The content provided on this platform is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider before beginning any new health regimen.
          </p>
        </div>
      </div>
    </div>
  )
}
