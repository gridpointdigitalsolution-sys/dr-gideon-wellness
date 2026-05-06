import { Star, MapPin, Zap, Leaf, ShieldAlert } from 'lucide-react'
import { Remedy } from '@/lib/matchRemedies'

function normalisePotency(p: unknown): string {
  if (typeof p === 'string' && ['High','Medium','Low'].includes(p)) return p
  if (typeof p === 'number') {
    if (p >= 4.5) return 'High'
    if (p >= 4.2) return 'Medium'
    return 'Low'
  }
  return 'Low'
}

export default function RemedyCard({ remedy }: { remedy: Remedy }) {
  const potencyLabel = normalisePotency(remedy.potency)

  const potencyConfig = ({
    High:   { color: '#52e07f', dot: '#22a050', glow: 'rgba(82,224,127,0.20)', label: 'High' },
    Medium: { color: '#fbbf24', dot: '#f59e0b', glow: 'rgba(251,191,36,0.20)', label: 'Medium' },
    Low:    { color: '#a8b5bf', dot: '#94a3b8', glow: 'rgba(168,181,191,0.16)', label: 'Low' },
  } as Record<string, { color: string; dot: string; glow: string; label: string }>)[potencyLabel]
  || { color: '#a8b5bf', dot: '#94a3b8', glow: 'rgba(168,181,191,0.16)', label: 'Low' }

  return (
    <article className="group relative flex flex-col h-full card-dark card-accent-top"
      style={{
        borderRadius: 22,
      }}>

      {/* Ambient potency glow */}
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${potencyConfig.glow} 0%, transparent 70%)`,
          transform: 'translate(25%,-30%)',
        }} />

      {/* Top strip — potency + rating */}
      <header className="relative flex items-center justify-between px-4 sm:px-5 pt-4 pb-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
              style={{ background: potencyConfig.dot }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: potencyConfig.color }} />
          </span>
          <span className="text-[10px] sm:text-xs font-body font-bold uppercase tracking-[0.18em]"
            style={{ color: potencyConfig.color }}>
            {potencyConfig.label} potency
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,215,0,0.10)', border: '1px solid rgba(255,215,0,0.25)' }}>
          <Star className="w-3 h-3" style={{ color: '#ffd700', fill: '#ffd700' }} />
          <span className="text-xs font-body font-bold" style={{ color: '#ffd700' }}>{remedy.rating}</span>
        </div>
      </header>

      <div className="relative px-4 sm:px-5 py-4 sm:py-5 flex flex-col flex-1">

        {/* Name + scientific + origin */}
        <div className="mb-4">
          <h3 className="font-display font-bold leading-[1.15] mb-1.5"
            style={{ fontSize: 'clamp(1.05rem, 2.6vw, 1.25rem)', color: '#ffd700', letterSpacing: '-0.01em', textShadow: '0 0 24px rgba(255,215,0,0.18)' }}>
            {remedy.name}
          </h3>
          <p className="text-[11px] sm:text-xs font-body italic mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {remedy.scientific_name}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-body" style={{ color: 'rgba(220,235,225,0.78)' }}>
            <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,215,0,0.65)' }} />
            <span className="truncate">{remedy.origin}</span>
          </div>
        </div>

        {/* Helps with */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.18em] font-body font-semibold mb-2" style={{ color: 'rgba(255,215,0,0.6)' }}>
            Helps with
          </p>
          <div className="flex flex-wrap gap-1.5">
            {remedy.symptoms.slice(0, 4).map(s => (
              <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-body capitalize font-medium"
                style={{ background: 'rgba(82,224,127,0.10)', color: '#bbf4d2', border: '1px solid rgba(82,224,127,0.22)' }}>
                {s}
              </span>
            ))}
            {remedy.symptoms.length > 4 && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-body font-medium"
                style={{ background: 'rgba(255,215,0,0.10)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.22)' }}>
                +{remedy.symptoms.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Preparation snippet */}
        <p className="text-[12px] sm:text-[13px] font-body leading-relaxed flex-1 mb-4 line-clamp-2"
          style={{ color: 'rgba(220,235,225,0.7)' }}>
          {remedy.preparation}
        </p>

        {/* Footer — category + safety */}
        <footer className="pt-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="text-[11px] font-body px-2.5 py-1 rounded-full inline-flex items-center gap-1 font-medium"
            style={{ background: 'rgba(34,160,80,0.16)', color: '#bbf4d2', border: '1px solid rgba(34,160,80,0.28)' }}>
            <Leaf className="w-3 h-3" />
            {remedy.category}
          </span>
          <div className="text-[11px] font-body rounded-lg px-3 py-2 flex items-start gap-2"
            style={{ background: 'rgba(253,211,77,0.08)', color: 'rgba(255,215,0,0.85)', border: '1px solid rgba(253,211,77,0.18)' }}>
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{remedy.safety.slice(0, 80)}{remedy.safety.length > 80 ? '…' : ''}</span>
          </div>
        </footer>
      </div>
    </article>
  )
}
