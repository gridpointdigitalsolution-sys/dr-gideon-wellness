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
    High:   { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)' },
    Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
    Low:    { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)' },
  } as Record<string, { color: string; bg: string; border: string }>)[potencyLabel] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)' }

  return (
    <div className="group relative flex flex-col h-full overflow-hidden"
      style={{
        background: 'white',
        border: '1px solid rgba(255,215,0,0.15)',
        borderRadius: 20,
        boxShadow: '0 4px 20px rgba(10,61,31,0.06)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>

      {/* Top strip */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ background: potencyConfig.bg, borderBottom: `1px solid ${potencyConfig.border}` }}>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" style={{ color: potencyConfig.color }} />
          <span className="text-xs font-body font-bold uppercase tracking-wider" style={{ color: potencyConfig.color }}>
            {potencyLabel} Potency
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
          <Star className="w-3 h-3" style={{ color: '#ffd700', fill: '#ffd700' }} />
          <span className="text-xs font-body font-bold" style={{ color: '#b87800' }}>{remedy.rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-display font-bold text-green-900 text-base leading-tight mb-1">{remedy.name}</h3>
          <p className="text-gray-400 text-xs font-body italic mb-2">{remedy.scientific_name}</p>
          <div className="flex items-center gap-1 text-xs font-body" style={{ color: 'rgba(100,130,110,0.7)' }}>
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{remedy.origin}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest font-body mb-2" style={{ color: 'rgba(34,160,80,0.7)' }}>Helps with</p>
          <div className="flex flex-wrap gap-1.5">
            {remedy.symptoms.slice(0, 4).map(s => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs font-body capitalize"
                style={{ background: '#f0faf0', color: '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }}>
                {s}
              </span>
            ))}
            {remedy.symptoms.length > 4 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-body"
                style={{ background: 'rgba(255,215,0,0.1)', color: '#b87800', border: '1px solid rgba(255,215,0,0.2)' }}>
                +{remedy.symptoms.length - 4}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-500 text-xs font-body leading-relaxed flex-1 mb-4 line-clamp-2">
          {remedy.preparation}
        </p>

        <div className="pt-3 border-t space-y-2" style={{ borderColor: 'rgba(34,160,80,0.1)' }}>
          <span className="text-xs font-body px-2.5 py-1 rounded-full inline-flex items-center gap-1"
            style={{ background: 'rgba(34,160,80,0.08)', color: '#22a050', border: '1px solid rgba(34,160,80,0.15)' }}>
            <Leaf className="w-3 h-3" />
            {remedy.category}
          </span>
          <div className="text-xs font-body rounded-lg px-3 py-2"
            style={{ background: '#fffbeb', color: '#92400e', border: '1px solid rgba(253,211,77,0.3)' }}>
            ⚠️ {remedy.safety.slice(0, 75)}{remedy.safety.length > 75 ? '...' : ''}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg, #22a050, #ffd700, #22a050)' }} />
    </div>
  )
}
