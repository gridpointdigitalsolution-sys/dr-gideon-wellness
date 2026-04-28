'use client'
import { Shield, Globe, BookOpen, Award, Leaf, Heart, GraduationCap, Church, FlaskConical } from 'lucide-react'
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
    <div className="min-h-screen" style={{ background: '#f0f4f0' }}>
      {/* Hero */}
      <div className="bg-forest py-24 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05), transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-body"
                style={{ color: 'rgba(255,215,0,0.7)' }}>About The Expert</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Reverend Dr.
                <br />
                <span className="gold-text">Gideon Afolabi</span>
              </h1>
              <p className="font-body text-lg leading-relaxed mb-8"
                style={{ color: 'rgba(187,244,210,0.8)' }}>
                A man whose life is a tapestry of deep faith, a profound love for nature, and an unwavering
                commitment to humanity's well-being — bridging ancient herbal wisdom with modern preventive health.
              </p>
              <Link href="/checker" className="btn-gold">
                Get a Free Assessment
              </Link>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative" style={{ width: 340, height: 380 }}>
                {/* Glow rings */}
                <div className="absolute rounded-2xl pointer-events-none"
                  style={{
                    inset: -3,
                    background: 'conic-gradient(from 0deg, rgba(255,215,0,0.4), rgba(34,160,80,0.1), rgba(255,215,0,0.4))',
                    filter: 'blur(6px)',
                    borderRadius: 22,
                  }} />
                <div className="absolute rounded-2xl overflow-hidden"
                  style={{
                    inset: 6,
                    border: '2px solid rgba(255,215,0,0.3)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                  }}>
                  <img
                    src="/dr-gideon.jpg"
                    alt="Reverend Dr. Gideon Afolabi"
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
                            <p style="color:rgba(255,215,0,0.5);font-size:11px;font-family:sans-serif;letter-spacing:4px;margin-top:8px">REV. DR. GIDEON</p>
                          </div>`
                      }
                    }}
                  />
                </div>

                {/* Gold badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #b87800)',
                    boxShadow: '0 6px 24px rgba(255,215,0,0.4)',
                  }}>
                  <p className="text-green-900 font-display font-bold text-sm">Founder · Herbal Wisdom Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-20 px-4" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-xs uppercase tracking-widest font-body mb-3">The Story</p>
            <h2 className="font-display text-3xl font-bold text-green-900 mb-4">A Life Dedicated to Healing</h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Bio text */}
            <div className="lg:col-span-3 space-y-5">
              <p className="font-body text-gray-700 leading-relaxed">
                <strong className="text-green-900">Reverend Dr. Gideon Afolabi</strong>, the visionary founder of Herbal Wisdom Reviews, is a man whose life is a tapestry of deep faith, a profound love for nature, and an unwavering commitment to humanity's well-being. For over two decades, this passion has not merely simmered in silence but has been a loud call to action that Dr. Afolabi has answered with courage and dedication.
              </p>
              <p className="font-body text-gray-700 leading-relaxed">
                As a pastor, he has nurtured souls — and now, with Herbal Wisdom Reviews, he seeks to nurture bodies and minds, guiding people to a deeper understanding and appreciation of the healing virtues that nature holds. His belief in the sanctity of the natural world and its ability to heal is rooted in a spiritual understanding that everything provided by God has a purpose, including the plants and herbs that have been used for healing since time immemorial.
              </p>
              <p className="font-body text-gray-700 leading-relaxed">
                As a graduate of the prestigious <strong className="text-green-900">Cornell University, College of Agriculture and Life Sciences, USA</strong>, with a specialization in Medicinal Plants, and currently pursuing a <strong className="text-green-900">PhD in Natural Medicine and Functional Health Management</strong>, Dr. Afolabi's journey began with a vision — a divine insight that has propelled him forward on a mission to reveal the untapped powers of natural remedies.
              </p>
              <p className="font-body text-gray-700 leading-relaxed">
                His dedication to this cause is not just about advocating for natural remedies, but is a call to humanity to reconnect with the environment, to respect it, and to learn from its wisdom.
              </p>
            </div>

            {/* Sidebar quote + stat */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #071a0e, #0a3d1f)',
                  border: '1px solid rgba(255,215,0,0.2)',
                }}>
                <div className="text-5xl font-display font-bold mb-3" style={{ color: 'rgba(255,215,0,0.3)', lineHeight: 1 }}>"</div>
                <p className="font-body text-sm leading-relaxed italic" style={{ color: 'rgba(187,244,210,0.85)' }}>
                  Everything provided by God has a purpose — including the plants and herbs used for healing since time immemorial.
                </p>
                <p className="font-body text-xs mt-4" style={{ color: 'rgba(255,215,0,0.6)' }}>— Rev. Dr. Gideon Afolabi</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '20+', label: 'Years of Study' },
                  { val: 'Cornell', label: 'University' },
                  { val: '6', label: 'Traditions' },
                  { val: 'Global', label: 'Impact' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-4 text-center"
                    style={{ background: '#f0faf0', border: '1px solid rgba(34,160,80,0.15)' }}>
                    <p className="font-display font-bold text-xl text-green-900">{s.val}</p>
                    <p className="text-xs font-body text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-10 h-10 text-green-900 mx-auto mb-6" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-green-900 mb-6">The Mission</h2>
          <p className="font-body text-green-800 text-lg leading-relaxed">
            "To democratize access to nature's healing intelligence — empowering every person, regardless of geography or background, to find safe, effective, and affordable natural solutions for their health challenges."
          </p>
          <p className="font-body text-green-700 mt-4 font-bold">— Rev. Dr. Gideon Afolabi</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 px-4" style={{ background: '#f0f4f0' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-green-900 mb-4">The Journey</h2>
            <div className="divider-gold" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.4), transparent)' }} />
            <div className="space-y-8">
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
                    <h3 className="font-display font-bold text-green-900 mb-1">{t.label}</h3>
                    <p className="text-gray-500 font-body text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-green-900 mb-4">Expertise & Credentials</h2>
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
                  <p className="text-gray-500 font-body text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Healing Traditions */}
      <div className="py-20 px-4 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Healing <span className="gold-text">Traditions</span> We Draw From
          </h2>
          <p className="font-body mb-12" style={{ color: 'rgba(187,244,210,0.7)' }}>
            Dr. Gideon Afolabi Wellness synthesizes knowledge from six major global healing traditions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {traditions.map(t => (
              <span key={t.name}
                className="px-5 py-3 rounded-full font-body text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: t.color + '15',
                  border: `1px solid ${t.color}40`,
                  color: t.color,
                  backdropFilter: 'blur(8px)',
                }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-12 px-4 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <Heart className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <p className="text-amber-700 font-body text-sm leading-relaxed">
            <strong>Medical Disclaimer:</strong> The content provided on this platform is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider before beginning any new health regimen. Dr. Gideon Afolabi Wellness does not diagnose or treat medical conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
