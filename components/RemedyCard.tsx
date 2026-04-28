import { Star, MapPin, Zap, Leaf } from 'lucide-react'
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
    High:   { color: '#4ade80', glow: 'rgba(74,222,128,0.22)',  border: 'rgba(74,222,128,0.28)' },
    Medium: { color: '#fbbf24', glow: 'rgba(251,191,36,0.22)',  border: 'rgba(251,191,36,0.28)' },
    Low:    { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.22)' },
  } as Record<string, { color: string; glow: string; border: string }>)[potencyLabel]
  || { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.22)' }

  return (
    <div className="group relative flex flex-col h-full overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #071c0f 0%, #0a3d1f 55%, #0d4a24 100%)',
        border: '1px solid rgba(255,215,0,0.18)',
        borderRadius: 20,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 56px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,215,0,0.35)'
        el.style.borderColor = 'rgba(255,215,0,0.4)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)'
        el.style.borderColor = 'rgba(255,215,0,0.18)'
      }}>

      {/* Ambient glow top-right */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full"
        style={{ background: `radial-gradient(circle, ${potencyConfig.glow} 0%, transparent 70%)`, transform: 'translate(20%,-20%)' }} />

      {/* Hover shimmer bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #ffd700, rgba(255,215,0,0.3), transparent)' }} />

      {/* Top strip */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" style={{ color: potencyConfig.color }} />
          <span className="text-xs font-body font-bold uppercase tracking-wider" style={{ color: potencyConfig.color }}>
            {potencyLabel} Potency
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.25)' }}>
          <Star className="w-3 h-3" style={{ color: '#ffd700', fill: '#ffd700' }} />
          <span className="text-xs font-body font-bold" style={{ color: '#ffd700' }}>{remedy.rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">

        {/* Name, botanical, location — all white/gold */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-base leading-tight mb-1"
            style={{ color: '#ffd700', textShadow: '0 0 20px rgba(255,215,0,0.25)' }}>
            {remedy.name}
          </h3>
          <p className="text-xs font-body italic mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {remedy.scientific_name}
          </p>
          <div className="flex items-center gap-1 text-xs font-body font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,215,0,0.6)' }} />
            <span>{remedy.origin}</span>
          </div>
        </div>

        {/* Helps with */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest font-body font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Helps with
          </p>
          <div className="flex flex-wrap gap-1.5">
            {remedy.symptoms.slice(0, 4).map(s => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs font-body capitalize font-medium"
                style={{ background: 'rgba(34,160,80,0.18)', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(34,160,80,0.3)' }}>
                {s}
              </span>
            ))}
            {remedy.symptoms.length > 4 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-body font-medium"
                style={{ background: 'rgba(255,215,0,0.12)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.22)' }}>
                +{remedy.symptoms.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Preparation */}
        <p className="text-xs font-body leading-relaxed flex-1 mb-4 line-clamp-2"
          style={{ color: 'rgba(255,255,255,0.72)' }}>
          {remedy.preparation}
        </p>

        {/* Footer */}
        <div className="pt-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="text-xs font-body px-2.5 py-1 rounded-full inline-flex items-center gap-1 font-medium"
            style={{ background: 'rgba(34,160,80,0.18)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(34,160,80,0.25)' }}>
            <Leaf className="w-3 h-3" />
            {remedy.category}
          </span>
          <div className="text-xs font-body rounded-lg px-3 py-2"
            style={{ background: 'rgba(253,211,77,0.09)', color: 'rgba(255,215,0,0.8)', border: '1px solid rgba(253,211,77,0.18)' }}>
            ⚠️ {remedy.safety.slice(0, 75)}{remedy.safety.length > 75 ? '...' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
