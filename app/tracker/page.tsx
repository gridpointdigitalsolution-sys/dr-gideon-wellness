'use client'
import { useState } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts'
import { Activity, Heart, Moon, Zap, Brain, Wind, Download, TrendingUp } from 'lucide-react'

const metrics = [
  { key: 'energy', label: 'Energy Level', icon: Zap, color: '#ffd700', low: 'Exhausted', high: 'Energised' },
  { key: 'sleep', label: 'Sleep Quality', icon: Moon, color: '#818cf8', low: 'Terrible', high: 'Excellent' },
  { key: 'stress', label: 'Stress Level', icon: Brain, color: '#f43f5e', low: 'Extreme stress', high: 'Fully relaxed' },
  { key: 'digestion', label: 'Digestion', icon: Activity, color: '#22a050', low: 'Very poor', high: 'Perfect' },
  { key: 'pain', label: 'Pain / Discomfort', icon: Heart, color: '#fb923c', low: 'Severe pain', high: 'Pain-free' },
  { key: 'breathing', label: 'Breathing / Clarity', icon: Wind, color: '#38bdf8', low: 'Very difficult', high: 'Clear & easy' },
]

const getWellnessLabel = (score: number) => {
  if (score >= 85) return { label: 'Excellent', color: '#22a050' }
  if (score >= 70) return { label: 'Good', color: '#84cc16' }
  if (score >= 50) return { label: 'Fair', color: '#f59e0b' }
  if (score >= 30) return { label: 'Low', color: '#f97316' }
  return { label: 'Critical', color: '#ef4444' }
}

const getRemedySuggestions = (values: Record<string, number>) => {
  const s = []
  if (values.energy < 50) s.push({ condition: 'Low Energy', remedy: 'Ashwagandha root + Maca powder', tip: 'Take 500mg ashwagandha daily with warm milk' })
  if (values.sleep < 50) s.push({ condition: 'Poor Sleep', remedy: 'Valerian Root + Chamomile Tea', tip: 'Drink chamomile tea 30 minutes before bed' })
  if (values.stress > 50) s.push({ condition: 'High Stress', remedy: 'Holy Basil (Tulsi) + Lavender', tip: 'Diffuse lavender oil and drink tulsi tea twice daily' })
  if (values.digestion < 50) s.push({ condition: 'Digestive Issues', remedy: 'Ginger + Peppermint + Fennel Seeds', tip: 'Brew ginger and fennel tea after meals' })
  if (values.pain > 50) s.push({ condition: 'Pain / Inflammation', remedy: 'Turmeric + Boswellia + Willow Bark', tip: 'Take turmeric with black pepper in warm water twice daily' })
  if (values.breathing < 50) s.push({ condition: 'Respiratory Issues', remedy: 'Eucalyptus + Thyme + Mullein', tip: 'Steam inhale eucalyptus oil twice daily' })
  return s
}

function downloadTrackerPDF(values: Record<string, number>, score: number, label: string, suggestions: {condition:string;remedy:string;tip:string}[]) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const { color } = getWellnessLabel(score)
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>Dr. Gideon Afolabi — Wellness Score Report</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;color:#0d1f12}
    .header{background:#0a3d1f;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:white;padding:36px 40px;border-bottom:4px solid #ffd700}
    .brand h1{font-size:28px;color:#ffd700;margin-bottom:6px;letter-spacing:0.5px;font-family:Georgia,serif}
    .brand p{font-size:13px;color:#a8e6c0;text-transform:uppercase;letter-spacing:2.5px;font-weight:700;margin-top:2px}
    .score-box{display:flex;align-items:center;gap:20px;margin:30px 40px;padding:24px;background:#f8fff4;border:2px solid rgba(34,160,80,0.2);border-radius:16px}
    .score-num{font-size:64px;font-weight:900;color:${color};line-height:1}
    .score-label{font-size:22px;color:${color};font-weight:bold}.score-sub{font-size:12px;color:#888;margin-top:4px}
    .metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 40px 30px}
    .metric{background:white;border:1px solid rgba(34,160,80,0.15);border-radius:12px;padding:14px}
    .metric-name{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .metric-val{font-size:28px;font-weight:900}
    .metric-bar{height:6px;background:#e5e7eb;border-radius:99px;margin-top:8px}
    .metric-fill{height:6px;border-radius:99px}
    .section{padding:0 40px 30px}.section h2{font-size:16px;font-weight:bold;color:#0a3d1f;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #ffd700}
    .remedy{background:#f8fff4;border:1px solid rgba(34,160,80,0.2);border-radius:12px;padding:16px;margin-bottom:12px}
    .remedy-condition{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#ef4444;margin-bottom:6px}
    .remedy-name{font-size:15px;font-weight:bold;color:#0a3d1f;margin-bottom:8px}
    .remedy-tip{font-size:12px;color:#444;background:rgba(34,160,80,0.08);padding:10px;border-radius:8px}
    .footer{background:#f8fff4;border-top:1px solid rgba(34,160,80,0.2);padding:20px 40px;margin-top:20px;font-size:11px;color:#888}
  </style></head><body>
  <div class="header"><div class="brand"><h1>🌿 Dr. Gideon Afolabi Wellness</h1><p>Wellness Tracker Report · ${date}</p></div></div>
  <div class="score-box">
    <div class="score-num">${score}</div>
    <div><div class="score-label">${label} Wellness</div><div class="score-sub">Overall score out of 100</div></div>
  </div>
  <div class="section"><h2>Health Dimension Breakdown</h2></div>
  <div class="metrics">
    ${metrics.map(m => `<div class="metric"><div class="metric-name">${m.label}</div><div class="metric-val" style="color:${m.color}">${values[m.key]}</div><div class="metric-bar"><div class="metric-fill" style="width:${values[m.key]}%;background:${m.color}"></div></div></div>`).join('')}
  </div>
  ${suggestions.length > 0 ? `<div class="section"><h2>Recommended Remedies</h2>${suggestions.map(s => `<div class="remedy"><div class="remedy-condition">Detected: ${s.condition}</div><div class="remedy-name">${s.remedy}</div><div class="remedy-tip"><strong>How to use:</strong> ${s.tip}</div></div>`).join('')}</div>` : ''}
  <div class="footer">
    <p><strong>Disclaimer:</strong> This wellness assessment is for informational purposes only and does not constitute medical advice.</p>
    <p style="margin-top:6px">Dr. Gideon Afolabi Wellness · Herbal Wisdom Reviews · © ${new Date().getFullYear()}</p>
  </div></body></html>`
  const win = window.open('', '_blank')
  if (win) { win.document.write(html); win.document.close(); setTimeout(() => { win.print() }, 500) }
}

export default function HealthTrackerPage() {
  const [values, setValues] = useState<Record<string, number>>({
    energy: 50, sleep: 50, stress: 50, digestion: 50, pain: 50, breathing: 50,
  })
  const [analyzed, setAnalyzed] = useState(false)

  const wellnessScore = Math.round(
    (values.energy + values.sleep + (100 - values.stress) + values.digestion + (100 - values.pain) + values.breathing) / 6
  )
  const { label, color } = getWellnessLabel(wellnessScore)
  const suggestions = getRemedySuggestions(values)
  const gaugeData = [{ value: wellnessScore, fill: color }]

  return (
    <div className="min-h-screen" style={{ background: '#f0f4f0' }}>
      <div className="bg-forest py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(34,160,80,0.15)', border: '1px solid rgba(34,160,80,0.3)' }}>
            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-body uppercase tracking-widest text-green-400">Live Wellness Assessment</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Health <span className="gold-text">Tracker</span>
          </h1>
          <p className="font-body max-w-xl mx-auto" style={{ color: 'rgba(187,244,210,0.75)' }}>
            Rate how you are feeling across six key health dimensions. Get your wellness score and personalized remedy suggestions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Sliders — premium muted cards */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-green-900">Rate Your Health</h2>
                <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(100,130,110,0.7)' }}>Drag each slider to reflect how you feel today</p>
              </div>
              <span className="text-xs font-body px-3 py-1.5 rounded-full font-semibold"
                style={{ background: 'rgba(255,215,0,0.1)', color: '#b87800', border: '1px solid rgba(255,215,0,0.25)' }}>
                0 = worst · 100 = best
              </span>
            </div>

            {metrics.map(m => {
              const val = values[m.key]
              const pct = val
              return (
                <div key={m.key} className="relative overflow-hidden transition-all hover:translate-y-[-1px]"
                  style={{
                    background: 'linear-gradient(135deg, #f7f9f7 0%, #f2f6f2 100%)',
                    border: `1px solid rgba(0,0,0,0.06)`,
                    borderLeft: `4px solid ${m.color}`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    boxShadow: '0 2px 16px rgba(10,61,31,0.05), 0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                  {/* Subtle coloured glow behind icon */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${m.color}12 0%, transparent 70%)`, transform: 'translate(30%,-30%)' }} />

                  <div className="flex items-center gap-4 mb-4">
                    {/* Icon — larger, circle with soft gradient bg */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${m.color}22, ${m.color}10)`,
                        border: `1.5px solid ${m.color}30`,
                        boxShadow: `0 4px 12px ${m.color}18`,
                      }}>
                      <m.icon className="w-6 h-6" style={{ color: m.color }} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-body font-bold text-green-900" style={{ fontSize: 15 }}>{m.label}</span>
                        {/* Large live number */}
                        <span className="font-display font-black text-3xl leading-none" style={{ color: m.color }}>{val}</span>
                      </div>
                      {/* Thin progress track */}
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${m.color}18` }}>
                        <div className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${m.color}70, ${m.color})` }} />
                      </div>
                    </div>
                  </div>

                  {/* Slider — thick, coloured, premium feel */}
                  <input type="range" min="0" max="100" value={val}
                    onChange={e => setValues(prev => ({ ...prev, [m.key]: Number(e.target.value) }))}
                    className="w-full appearance-none cursor-pointer"
                    style={{
                      height: 10,
                      borderRadius: 99,
                      outline: 'none',
                      accentColor: m.color,
                      background: `linear-gradient(90deg, ${m.color} 0%, ${m.color} ${pct}%, rgba(0,0,0,0.08) ${pct}%, rgba(0,0,0,0.08) 100%)`,
                    }}
                  />

                  {/* Low / High labels as mini pills */}
                  <div className="flex justify-between mt-2.5">
                    <span className="text-xs font-body px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(80,80,80,0.7)' }}>{m.low}</span>
                    <span className="text-xs font-body px-2 py-0.5 rounded-full"
                      style={{ background: `${m.color}15`, color: m.color, fontWeight: 600 }}>{m.high}</span>
                  </div>
                </div>
              )
            })}

            <button onClick={() => setAnalyzed(true)}
              className="w-full text-base font-body font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] mt-2"
              style={{ background: 'linear-gradient(135deg, #ffd700, #e6c300)', color: '#0a3d1f', boxShadow: '0 8px 28px rgba(255,215,0,0.4)', letterSpacing: '0.3px' }}>
              ⚡ Analyse My Wellness Score
            </button>
          </div>

          {/* RIGHT: Score Gauge */}
          <div>
            <div className="sticky top-24 space-y-4">
              <div style={{ background: 'linear-gradient(160deg, #071a0e, #0a3d1f, #145a2e)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 24, padding: 24, boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
                <p className="text-xs uppercase tracking-widest font-body mb-5 text-center" style={{ color: 'rgba(255,215,0,0.6)' }}>
                  Your Wellness Score
                </p>
                <div className="w-48 h-48 mx-auto relative">
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 30px ${color}40` }} />
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%"
                      data={gaugeData} startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={10} background={{ fill: 'rgba(255,255,255,0.05)' }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-5xl font-bold" style={{ color }}>{wellnessScore}</span>
                    <span className="font-body text-sm font-bold mt-1" style={{ color }}>{label}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {metrics.map(m => (
                    <div key={m.key} className="rounded-xl p-2.5 text-center"
                      style={{ background: m.color + '15', border: `1px solid ${m.color}25` }}>
                      <m.icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: m.color }} />
                      <p className="text-xs font-bold font-body" style={{ color: m.color }}>{values[m.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
              {analyzed && (
                <button onClick={() => downloadTrackerPDF(values, wellnessScore, label, suggestions)}
                  className="w-full flex items-center justify-center gap-2 font-body font-semibold text-sm py-3.5 rounded-2xl transition-all hover:scale-105"
                  style={{ background: 'white', color: '#145a2e', border: '1px solid rgba(34,160,80,0.3)', boxShadow: '0 4px 12px rgba(10,61,31,0.1)' }}>
                  <Download className="w-4 h-4" style={{ color: '#ffd700' }} />
                  Download Wellness Report
                </button>
              )}
            </div>
          </div>
        </div>

        {analyzed && suggestions.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-green-900 mb-2">Recommended Remedies</h2>
              <div className="divider-gold" />
              <p className="font-body text-sm mt-3" style={{ color: '#888' }}>Based on your wellness scores</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {suggestions.map(s => (
                <div key={s.condition}
                  style={{ background: 'white', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 20, padding: '24px', boxShadow: '0 4px 20px rgba(10,61,31,0.07)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-500 uppercase tracking-widest font-body font-semibold">Detected: {s.condition}</p>
                  </div>
                  <h3 className="font-display text-lg font-bold text-green-900 mb-4">{s.remedy}</h3>
                  <div className="rounded-xl p-4" style={{ background: '#f0faf0', border: '1px solid rgba(34,160,80,0.15)' }}>
                    <p className="text-xs text-green-600 uppercase tracking-widest font-body mb-2">How to use</p>
                    <p className="text-green-800 text-sm font-body leading-relaxed">{s.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {analyzed && suggestions.length === 0 && (
          <div className="mt-12 text-center py-16"
            style={{ background: 'white', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 24, boxShadow: '0 4px 20px rgba(10,61,31,0.07)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #22a050, #145a2e)', boxShadow: '0 8px 24px rgba(34,160,80,0.35)' }}>
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-green-900 mb-3">You are Doing Great!</h2>
            <p className="text-gray-500 font-body max-w-md mx-auto">Your wellness scores look strong. Keep up your current routine. Explore our Encyclopedia for preventive herbal support.</p>
          </div>
        )}
      </div>
    </div>
  )
}
