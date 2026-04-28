'use client'
import { Shield, Globe, BookOpen, Award, Leaf, Heart, GraduationCap, Church, FlaskConical, Quote } from 'lucide-react'
import Link from 'next/link'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Cornell University Graduate',
    desc: 'College of Agriculture and Life Sciences, USA — specialization in Medicinal Plants',
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
    desc: 'A pastor who has nurtured souls — now dedicated to nurturing bodies and minds through nature',
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
  { year: '2000s', label: 'The Calling', desc: 'A divine insight sparked a lifelong mission to reveal the untapped powers of natural remedies.' },
  { year: '2010s', label: 'Cornell University', desc: 'Specialized in Medicinal Plants at the prestigious College of Agriculture and Life Sciences, USA.' },
  { year: '2015+', label: 'Herbal Wisdom Reviews', desc: 'Founded the platform to democratize access to nature\'s healing intelligence globally.' },
  { year: 'Now', label: 'PhD & Beyond', desc: 'Pursuing a doctorate in Natural Medicine while guiding thousands worldwide to natural health.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 100%)' }}>

      {/* ── Hero ── */}
      <div className="bg-forest py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05), transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-label mb-5 font-body" style={{ color: 'rgba(255,215,0,0.7)' }}>
                About The Expert
              </p>
              <h1 className="font-display text-hero font-bold text-white mb-6">
                Reverend Dr.<br />
                <span className="gold-text">Gideon Afolabi</span>
              </h1>
              <p className="text-lead font-body mb-8" style={{ color: 'rgba(187,244,210,0.82)', maxWidth: 480 }}>
                A man whose life is a tapestry of deep faith, a profound love for nature, and an unwavering commitment to humanity's well-being — bridging ancient wisdom with modern preventive health.
              </p>
              <Link href="/checker" className="btn-gold">
                Get a Free Assessment
              </Link>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative mx-auto"
                style={{ width: 'clamp(260px, 55vw, 340px)', height: 'clamp(290px, 62vw, 380px)' }}>
                <div className="absolute rounded-2xl pointer-events-none"
                  style={{
                    inset: -3,
                    background: 'conic-gradient(from 0deg, rgba(255,215,0,0.4), rgba(34,160,80,0.1), rgba(255,215,0,0.4))',
                    filter: 'blur(6px)',
                    borderRadius: 22,
                  }} />
                <div className="absolute rounded-2xl overflow-hidden"
                  style={{ inset: 6, border: '2px solid rgba(255,215,0,0.3)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
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
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full whitespace-nowrap z-10"
                  style={{ background: 'linear-gradient(135deg, #ffd700, #b87800)', boxShadow: '0 6px 24px rgba(255,215,0,0.4)' }}>
                  <p className="text-green-900 font-body font-bold text-sm">Founder · Herbal Wisdom Reviews</p>
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
              {/* Drop-cap first paragraph */}
              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                <span className="float-left font-display font-bold mr-2 mt-1 leading-none"
                  style={{ fontSize: '4rem', color: '#0a3d1f', lineHeight: 0.85 }}>R</span>
                everend Dr. Gideon Afolabi, the visionary founder of Herbal Wisdom Reviews, is a man whose life is a tapestry of deep faith, a profound love for nature, and an unwavering commitment to humanity's well-being. For over two decades, this passion has not merely simmered in silence — it has been a loud call to action that Dr. Afolabi has answered with courage and dedication.
              </p>
              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                As a pastor, he has nurtured souls. Now, with Herbal Wisdom Reviews, he seeks to nurture bodies and minds — guiding people to a deeper understanding and appreciation of the healing virtues that nature holds.
              </p>

              {/* Pull quote */}
              <blockquote className="relative pl-6 py-1 my-6"
                style={{ borderLeft: '3px solid #ffd700' }}>
                <p className="font-display text-lg italic text-green-900 leading-relaxed">
                  "His dedication is not just about advocating for natural remedies, but is a call to humanity to reconnect with the environment, to respect it, and to learn from its wisdom."
                </p>
              </blockquote>

              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                As a graduate of the prestigious <strong className="text-green-900 font-semibold">Cornell University, College of Agriculture and Life Sciences, USA</strong>, with a specialization in Medicinal Plants, and currently pursuing a <strong className="text-green-900 font-semibold">PhD in Natural Medicine and Functional Health Management</strong>, Dr. Afolabi's journey began with a divine insight that has propelled him forward on a mission to reveal the untapped powers of natural remedies.
              </p>
              <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                His belief in the sanctity of the natural world is rooted in a spiritual understanding — that everything provided by God has a purpose, including the plants and herbs that have been used for healing since time immemorial.
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Quote card */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #071a0e, #0a3d1f)', border: '1px solid rgba(255,215,0,0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
                <Quote className="w-8 h-8 mb-4" style={{ color: 'rgba(255,215,0,0.35)' }} />
                <p className="font-body text-sm leading-relaxed italic" style={{ color: 'rgba(187,244,210,0.9)', fontSize: '0.95rem' }}>
                  Everything provided by God has a purpose — including the plants and herbs used for healing since time immemorial.
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
                  <div key={s.label} className="rounded-xl p-4 text-center card-resting">
                    <p className="font-display font-bold text-xl text-green-900">{s.val}</p>
                    <p className="font-body text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <div className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Leaf className="w-10 h-10 text-green-900 mx-auto mb-6" />
          <h2 className="font-display text-title font-bold text-green-900 mb-6">The Mission</h2>
          <p className="font-body text-green-800 leading-relaxed"
            style={{ fontSize: '1.15rem', fontStyle: 'italic' }}>
            "To democratize access to nature's healing intelligence — empowering every person, regardless of geography or background, to find safe, effective, and affordable natural solutions for their health challenges."
          </p>
          <p className="font-body text-green-700 mt-5 font-bold text-sm tracking-wide">— Rev. Dr. Gideon Afolabi</p>
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
                <div key={t.year} className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: i % 2 === 0 ? 'linear-gradient(135deg, #ffd700, #b87800)' : 'linear-gradient(135deg, #145a2e, #22a050)',
                      boxShadow: `0 4px 16px ${i % 2 === 0 ? 'rgba(255,215,0,0.4)' : 'rgba(34,160,80,0.4)'}`,
                    }}>
                    <span className="font-body font-bold text-xs"
                      style={{ color: i % 2 === 0 ? '#0a3d1f' : 'white' }}>{t.year}</span>
                  </div>
                  <div className="wellness-card p-5 flex-1">
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
              <div key={c.title} className="wellness-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: c.color === '#ffd700'
                      ? 'linear-gradient(135deg, #b87800, #ffd700)'
                      : 'linear-gradient(135deg, #145a2e, #22a050)',
                    boxShadow: `0 4px 14px ${c.color}40`,
                  }}>
                  <c.icon className="w-5 h-5" style={{ color: c.color === '#ffd700' ? '#0a3d1f' : 'white' }} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-green-900 mb-1">{c.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Healing Traditions ── */}
      <div className="py-20 px-4 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
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
                className="px-5 py-3 rounded-full font-body text-sm font-semibold transition-all hover:scale-105 cursor-default"
                style={{ background: t.color + '15', border: `1px solid ${t.color}40`, color: t.color, backdropFilter: 'blur(8px)' }}>
                {t.name}
              </span>
            ))}
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
