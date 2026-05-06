'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Camera, Upload, Leaf, Loader, X, Download, RotateCcw, CheckCircle, Shield, Microscope, Clock, Sparkles, Globe, Zap, BookOpen, ArrowRight } from 'lucide-react'

interface EnrichedPlant {
  id?: string
  common_name: string
  scientific_name: string
  family: string
  confidence: number
  alt_names: string[]
  description: string
  medicinal_uses: string[]
  preparation: string
  safety: string
  is_toxic: boolean
  growth_habit: string
  native_regions: string
  edible: boolean | null
  image_url: string
  trefle_id: number | null
  trefle_available: boolean
  saved_to_db: boolean
}

interface HistoryItem {
  id: string
  created_at: string
  common_name: string
  scientific_name: string
  family: string
  confidence: number
  image_url: string
  medicinal_uses: string[]
}

function downloadPlantCard(plant: EnrichedPlant) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const usesHtml = plant.medicinal_uses.slice(0, 6).map(u =>
    `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px">
      <div style="width:6px;height:6px;border-radius:50%;background:#ffd700;margin-top:5px;flex-shrink:0"></div>
      <span>${u}</span>
    </div>`
  ).join('')

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>${plant.common_name} — Plant Report · Dr. Gideon Afolabi Wellness</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;background:#f5f2ed;color:#0d1f12;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{position:relative;width:680px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.15)}
    .watermark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:0;overflow:hidden}
    .watermark img{width:340px;height:340px;object-fit:cover;opacity:0.04;border-radius:50%;filter:grayscale(100%)}
    .content{position:relative;z-index:1}
    .header{background:linear-gradient(135deg,#071c0f,#0a3d1f);padding:32px 36px;display:flex;justify-content:space-between;align-items:flex-start}
    .brand{display:flex;align-items:center;gap:10px}
    .brand-icon{width:44px;height:44px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px}
    .brand-text h1{font-size:16px;color:#ffd700;font-weight:700;letter-spacing:0.3px}
    .brand-text p{font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;margin-top:2px}
    .conf-badge{text-align:center;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);border-radius:14px;padding:12px 18px}
    .conf-num{font-size:32px;font-weight:900;color:#ffd700;line-height:1}
    .conf-lbl{font-size:9px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;margin-top:3px}
    .plant-hero{padding:28px 36px 20px;border-bottom:1px solid rgba(0,0,0,0.06)}
    .plant-name{font-size:30px;font-weight:900;color:#071c0f;margin-bottom:4px}
    .plant-sci{font-size:14px;color:#888;font-style:italic;margin-bottom:4px}
    .plant-family{display:inline-flex;align-items:center;gap:5px;background:rgba(34,160,80,0.1);border:1px solid rgba(34,160,80,0.2);border-radius:20px;padding:3px 10px;font-size:11px;color:#145a2e;font-weight:600;margin-bottom:8px}
    .badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
    .badge{padding:4px 10px;border-radius:20px;font-size:10px;font-weight:600}
    .toxic{background:#fef2f2;color:#dc2626;border:1px solid #fecaca}
    .safe{background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0}
    .trefle{background:rgba(255,215,0,0.08);color:#b87800;border:1px solid rgba(255,215,0,0.25)}
    .body{padding:24px 36px}
    .section{margin-bottom:20px}
    .sec-title{font-size:13px;font-weight:700;color:#0a3d1f;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #ffd700;display:inline-block}
    .desc{font-size:13px;color:#444;line-height:1.75;background:#f8fff4;border:1px solid rgba(34,160,80,0.12);border-radius:10px;padding:14px 16px}
    .uses{font-size:12px;color:#333;line-height:1.6}
    .prep{background:linear-gradient(135deg,#071c0f,#0a3d1f);border-radius:12px;padding:16px 20px;font-size:12px;color:rgba(255,255,255,0.85);line-height:1.7}
    .safety-box{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;font-size:11px;color:#92400e;line-height:1.6}
    .meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
    .meta-item{background:#f8f9fa;border-radius:8px;padding:10px 14px}
    .meta-label{font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px}
    .meta-value{font-size:12px;color:#333;font-weight:600}
    .footer{background:#f8fff4;border-top:1px solid rgba(34,160,80,0.1);padding:16px 36px;display:flex;justify-content:space-between;align-items:center}
    .footer-brand{font-size:11px;color:#999}
    .footer-date{font-size:11px;color:#999}
  </style></head><body>
  <div class="card">
    <div class="watermark"><img src="/dr-gideon.jpg" alt="" /></div>
    <div class="content">
      <div class="header">
        <div class="brand">
          <div class="brand-icon">🌿</div>
          <div class="brand-text"><h1>Dr. Gideon Afolabi Wellness</h1><p>Herbal Wisdom Reviews · Plant Report</p></div>
        </div>
        <div class="conf-badge"><div class="conf-num">${plant.confidence}%</div><div class="conf-lbl">AI Confidence</div></div>
      </div>
      <div class="plant-hero">
        <div class="plant-name">${plant.common_name}</div>
        <div class="plant-sci">${plant.scientific_name}</div>
        ${plant.family ? `<div class="plant-family">🌿 ${plant.family} Family</div>` : ''}
        <div class="badges">
          ${plant.is_toxic ? '<span class="badge toxic">⚠️ Toxic — Handle with care</span>' : '<span class="badge safe">✓ Non-toxic</span>'}
          ${plant.trefle_available ? '<span class="badge trefle">★ Trefle Verified Data</span>' : ''}
          ${plant.edible === true ? '<span class="badge safe">✓ Edible</span>' : ''}
          ${plant.growth_habit ? `<span class="badge trefle">${plant.growth_habit}</span>` : ''}
        </div>
        ${plant.alt_names?.length ? `<p style="font-size:11px;color:#888;margin-top:8px">Also known as: ${plant.alt_names.join(', ')}</p>` : ''}
      </div>
      <div class="body">
        ${plant.growth_habit || plant.native_regions ? `
        <div class="meta-grid">
          ${plant.growth_habit ? `<div class="meta-item"><div class="meta-label">Growth Habit</div><div class="meta-value">${plant.growth_habit}</div></div>` : ''}
          ${plant.native_regions ? `<div class="meta-item"><div class="meta-label">Native Regions</div><div class="meta-value">${plant.native_regions}</div></div>` : ''}
        </div>` : ''}
        <div class="section"><div class="sec-title">About This Plant</div><div class="desc">${plant.description}</div></div>
        <div class="section"><div class="sec-title">Medicinal Uses</div><div class="uses">${usesHtml}</div></div>
        <div class="section"><div class="sec-title">Preparation Guide</div><div class="prep">${plant.preparation}</div></div>
        <div class="section"><div class="sec-title">Safety Information</div><div class="safety-box">⚠️ ${plant.safety}</div></div>
      </div>
      <div class="footer">
        <span class="footer-brand">Dr. Gideon Afolabi Wellness · Herbal Wisdom Reviews © ${new Date().getFullYear()}</span>
        <span class="footer-date">Generated: ${date}</span>
      </div>
    </div>
  </div>
</body></html>`
  const win = window.open('', '_blank')
  if (win) { win.document.write(html); win.document.close(); setTimeout(() => win.print(), 600) }
}

export default function PlantIdentifierPage() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<EnrichedPlant | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true)
    try {
      const r = await fetch('/api/plant-history')
      if (r.ok) setHistory(await r.json())
    } catch { /* silent */ }
    setHistoryLoading(false)
  }, [])

  useEffect(() => { loadHistory() }, [loadHistory])

  const handleFile = (f: File) => {
    setFile(f); setResult(null); setError(null)
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f?.type.startsWith('image/')) handleFile(f)
  }

  const identify = async () => {
    if (!file) return
    setLoading(true); setError(null)
    try {
      const form = new FormData()
      form.append('images', file)
      const r = await fetch('/api/identify', { method: 'POST', body: form })
      const data = await r.json()
      if (!r.ok) throw new Error(data?.error || `Error ${r.status}`)
      const enriched = data.enriched
      if (!enriched) throw new Error('Identification failed. Try a clearer photo.')
      setResult(enriched)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
      loadHistory()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setImage(null); setFile(null); setResult(null); setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* Step indicator */
  const step = result ? 3 : image ? 2 : 1

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#f5f2ed 0%,#f8f6f2 100%)' }}>

      {/* ── Hero — premium dark gradient ── */}
      <div className="encyclopedia-hero py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,215,0,.55) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.08), transparent 65%)' }} />

        <div className="text-center relative max-w-2xl mx-auto fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(34,160,80,.12)', border: '1px solid rgba(34,160,80,.3)' }}>
            <Microscope className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[11px] font-body uppercase tracking-[0.18em] text-green-400">PlantNet AI + Trefle 1M+ Database</span>
          </div>

          <h1 className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2.5rem,5.5vw,4rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            Plant <span className="shimmer-gold-slow">Identifier</span>
          </h1>
          <p className="font-body mb-7" style={{ color: 'rgba(187,244,210,.75)', fontSize: '1.05rem' }}>
            Upload any plant photo. We identify it with AI, then pull deep botanical data from over 1 million plants — medicinal uses, growth habits, native regions and more.
          </p>

          {/* Data source stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            {[['1M+','Plants in database'],['PlantNet','AI Identification'],['Trefle','Botanical data'],['Supabase','History saved']].map(([v,l]) => (
              <div key={l} className="text-center px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-display font-bold text-sm shimmer-gold-slow">{v}</div>
                <div className="font-body text-[10px] mt-0.5" style={{ color: 'rgba(187,244,210,.5)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { n: 1, label: 'Upload Photo' },
            { n: 2, label: 'Identify' },
            { n: 3, label: 'View Results' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`step-dot ${step === s.n ? 'step-dot-active' : step > s.n ? 'step-dot-done' : 'step-dot-idle'}`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="font-body text-xs font-semibold hidden sm:block"
                  style={{ color: step === s.n ? '#0a3d1f' : step > s.n ? '#22a050' : '#aaa' }}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className="w-8 sm:w-14 h-px"
                  style={{ background: step > s.n ? 'linear-gradient(90deg,#22a050,#4ade80)' : 'rgba(0,0,0,0.12)' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Upload zone ── */}
        {!image && (
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer upload-zone-idle group relative overflow-hidden rounded-3xl mb-8"
            style={{
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: dragOver ? 'rgba(255,215,0,0.7)' : undefined,
              background: dragOver ? 'linear-gradient(160deg, #071a0e, #0d4a26)' : undefined,
              boxShadow: dragOver ? '0 0 60px rgba(34,160,80,0.18) inset, 0 16px 48px rgba(0,0,0,0.35)' : undefined,
            }}>
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.10]"
              style={{ backgroundImage: 'radial-gradient(circle,rgba(255,215,0,.5) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

            {/* Scan corners — animated */}
            <div className="scan-corner-tl transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400" />
            <div className="scan-corner-tr transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400" />
            <div className="scan-corner-bl transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400" />
            <div className="scan-corner-br transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400" />

            {/* Ambient hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'radial-gradient(circle at center,rgba(34,160,80,.07),transparent 70%)' }} />

            <div className="text-center z-10 py-10 px-8 relative">
              {/* Icon stack */}
              <div className="relative inline-block mb-7">
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(34,160,80,0.12)', filter: 'blur(12px)', transform: 'scale(1.5)' }} />
                <div className="upload-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: 'linear-gradient(135deg,#145a2e,#22a050)', boxShadow: '0 12px 32px rgba(34,160,80,.4)' }}>
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#ffd700,#b87800)', boxShadow: '0 4px 10px rgba(255,215,0,.5)' }}>
                  <Upload className="w-3.5 h-3.5 text-green-900" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                {dragOver ? 'Drop to identify!' : 'Upload a Plant Photo'}
              </h3>
              <p className="font-body text-sm mb-7" style={{ color: 'rgba(187,244,210,.55)' }}>
                Click to browse or drag & drop · JPG, PNG up to 10MB
              </p>

              <div className="btn-gold inline-flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4" /> Choose Photo
              </div>

              {/* Tips */}
              <div className="flex flex-wrap justify-center gap-2.5 mt-6">
                {['Clear close-up photo','Good natural lighting','Show leaf or flower','Avoid blurry images'].map(tip => (
                  <span key={tip} className="text-xs font-body px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(187,244,210,.55)', border: '1px solid rgba(255,255,255,.08)' }}>
                    ✓ {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          className="hidden" />

        {/* ── Image preview + identify button ── */}
        {image && !result && (
          <div className="mb-8 fade-in-up">
            <div className="relative rounded-3xl overflow-hidden mb-5"
              style={{ maxHeight: 400, background: 'linear-gradient(160deg,#071a0e,#0a3d1f)', border: '2px solid rgba(255,215,0,0.18)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
              <img src={image} alt="Plant" className="w-full object-contain" style={{ maxHeight: 400 }} />

              {/* Loading overlay with animated rings */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(5,15,8,0.72)', backdropFilter: 'blur(4px)' }}>
                  <div className="relative flex items-center justify-center">
                    <div className="scan-ring-1 absolute rounded-full"
                      style={{ width: 120, height: 120, border: '2px solid rgba(255,215,0,0.5)' }} />
                    <div className="scan-ring-2 absolute rounded-full"
                      style={{ width: 80, height: 80, border: '2px solid rgba(34,160,80,0.5)' }} />
                    <div className="scan-ring-3 absolute rounded-full"
                      style={{ width: 50, height: 50, border: '2px solid rgba(255,215,0,0.7)' }} />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.3)' }}>
                      <Leaf className="w-6 h-6" style={{ color: '#ffd700' }} />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="font-body text-sm font-semibold" style={{ color: '#ffd700' }}>
                      Analysing with PlantNet + Trefle…
                    </p>
                    <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Cross-referencing 1M+ botanical records
                    </p>
                  </div>
                </div>
              )}

              <button onClick={reset}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-body"
                style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', color: '#ef4444' }}>
                ⚠️ {error}
              </div>
            )}

            <button onClick={identify} disabled={loading}
              className="w-full flex items-center justify-center gap-3 font-body font-bold rounded-2xl py-4 transition-all text-base"
              style={loading
                ? { background: 'rgba(0,0,0,.06)', color: '#aaa', cursor: 'not-allowed' }
                : { background: 'linear-gradient(135deg,#0a3d1f,#145a2e)', color: '#ffd700', boxShadow: '0 8px 28px rgba(10,61,31,.35)', border: '1px solid rgba(255,215,0,.22)' }
              }>
              {loading
                ? <><Loader className="w-5 h-5 animate-spin" /> Analysing with PlantNet + Trefle…</>
                : <><Zap className="w-5 h-5" /> Identify &amp; Fetch Full Botanical Data <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </div>
        )}

        {/* ── Results ── */}
        {result && (
          <div ref={resultsRef} className="fade-in-up">
            {/* Result header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(34,160,80,0.18)', boxShadow: '0 4px 20px rgba(10,61,31,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(34,160,80,.12)', border: '1px solid rgba(34,160,80,.28)' }}>
                  <CheckCircle className="w-5 h-5" style={{ color: '#22a050' }} />
                </div>
                <div>
                  <p className="font-display font-bold text-green-900 text-lg leading-tight">{result.common_name}</p>
                  <p className="font-body text-xs italic mt-0.5" style={{ color: '#888' }}>{result.scientific_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-body text-xs transition-all hover:scale-105"
                  style={{ background: 'rgba(0,0,0,.06)', color: '#666', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <RotateCcw className="w-3.5 h-3.5" /> New scan
                </button>
                <button onClick={() => downloadPlantCard(result)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-bold text-xs transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#ffd700,#e6c300)', color: '#0a3d1f', boxShadow: '0 4px 16px rgba(255,215,0,.35)' }}>
                  <Download className="w-3.5 h-3.5" /> Download Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left column */}
              <div className="lg:col-span-1 space-y-4">
                {/* Confidence card */}
                <div className="rounded-2xl p-5 text-center"
                  style={{ background: 'linear-gradient(145deg,#071c0f,#0a3d1f)', border: '1px solid rgba(255,215,0,.22)', boxShadow: '0 8px 32px rgba(0,0,0,.25)' }}>
                  <div className="relative inline-block mb-3">
                    <div className="font-display font-bold shimmer-gold-slow" style={{ fontSize: 52, lineHeight: 1 }}>
                      {result.confidence}%
                    </div>
                    <div className="font-body text-[10px] uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,.45)' }}>
                      AI Confidence
                    </div>
                  </div>
                  <div className="space-y-2.5 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    {[
                      { label: 'Family', val: result.family || 'Unknown', gold: true },
                      result.growth_habit ? { label: 'Growth', val: result.growth_habit } : null,
                      result.native_regions ? { label: 'Native', val: result.native_regions } : null,
                      { label: 'Edible', val: result.edible === true ? 'Yes' : result.edible === false ? 'No' : 'Unknown',
                        colorVal: result.edible === true ? '#4ade80' : result.edible === false ? '#f87171' : 'rgba(255,255,255,.4)' },
                    ].filter(Boolean).map((row, i) => row && (
                      <div key={i} className="flex items-center justify-between text-xs font-body"
                        style={{ color: 'rgba(255,255,255,.65)' }}>
                        <span>{row.label}</span>
                        <span className="font-semibold text-right" style={{ maxWidth: '55%', color: row.gold ? '#ffd700' : row.colorVal || 'rgba(187,244,210,.85)' }}>
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="rounded-2xl p-4 space-y-2"
                  style={{ background: '#fff', border: '1px solid rgba(255,215,0,.18)', boxShadow: '0 2px 12px rgba(10,61,31,0.06)' }}>
                  {result.is_toxic && (
                    <div className="flex items-center gap-2 text-xs font-body font-semibold px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(239,68,68,.07)', color: '#dc2626', border: '1px solid rgba(239,68,68,.18)' }}>
                      ⚠️ Toxic — handle with care
                    </div>
                  )}
                  {result.trefle_available && (
                    <div className="flex items-center gap-2 text-xs font-body font-semibold px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,215,0,.08)', color: '#b87800', border: '1px solid rgba(255,215,0,.2)' }}>
                      <Sparkles className="w-3 h-3" /> Trefle verified botanical data
                    </div>
                  )}
                  {result.saved_to_db && (
                    <div className="flex items-center gap-2 text-xs font-body font-semibold px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(34,160,80,.08)', color: '#16a34a', border: '1px solid rgba(34,160,80,.2)' }}>
                      <CheckCircle className="w-3 h-3" /> Saved to plant history
                    </div>
                  )}
                  {result.alt_names?.length > 0 && (
                    <div className="text-xs font-body pt-1" style={{ color: '#888' }}>
                      <span className="font-semibold" style={{ color: '#666' }}>Also known as: </span>
                      {result.alt_names.join(', ')}
                    </div>
                  )}
                </div>

                {/* Plant image */}
                {result.image_url && (
                  <div className="rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,215,0,.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                    <img src={result.image_url} alt={result.common_name}
                      className="w-full object-cover" style={{ maxHeight: 200 }}
                      onError={e => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="lg:col-span-2 space-y-4">
                {/* Description */}
                <div className="rounded-2xl p-5"
                  style={{ background: '#fff', border: '1px solid rgba(34,160,80,.15)', boxShadow: '0 4px 20px rgba(10,61,31,.05)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4" style={{ color: '#0a3d1f' }} />
                    <span className="text-xs uppercase tracking-widest font-body font-bold" style={{ color: '#0a3d1f' }}>About This Plant</span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#444', lineHeight: 1.75 }}>{result.description}</p>
                </div>

                {/* Medicinal uses */}
                <div className="rounded-2xl p-5"
                  style={{ background: '#fff', border: '1px solid rgba(34,160,80,.15)', boxShadow: '0 4px 20px rgba(10,61,31,.05)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" style={{ color: '#22a050' }} />
                      <span className="text-xs uppercase tracking-widest font-body font-bold" style={{ color: '#0a3d1f' }}>Medicinal Uses</span>
                    </div>
                    {result.trefle_available && (
                      <span className="text-[10px] font-body px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,215,0,.1)', color: '#b87800', border: '1px solid rgba(255,215,0,.22)' }}>
                        ★ Trefle verified
                      </span>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    {result.medicinal_uses.map((u, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#ffd700' }} />
                        <span className="font-body text-sm" style={{ color: '#333', lineHeight: 1.65 }}>{u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation */}
                <div className="rounded-2xl p-5"
                  style={{ background: 'linear-gradient(135deg,#071c0f,#0a3d1f)', border: '1px solid rgba(255,215,0,.18)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4" style={{ color: '#ffd700' }} />
                    <span className="text-xs uppercase tracking-widest font-body font-bold" style={{ color: '#ffd700' }}>Preparation Guide</span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.82)', lineHeight: 1.75 }}>{result.preparation}</p>
                </div>

                {/* Safety */}
                <div className="rounded-2xl p-4" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} />
                    <p className="font-body text-xs leading-relaxed" style={{ color: '#92400e', lineHeight: 1.7 }}>{result.safety}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Plant History ── */}
        <div className="mt-14">
          <button onClick={() => { setShowHistory(v => !v); if (!showHistory) loadHistory() }}
            className="flex items-center gap-2.5 mb-6 group transition-all">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: 'rgba(10,61,31,0.07)', border: '1px solid rgba(10,61,31,0.12)' }}>
              <Clock className="w-4 h-4" style={{ color: '#0a3d1f' }} />
            </div>
            <span className="font-display font-bold text-green-900 text-lg">Your Plant History</span>
            <span className="font-body text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(34,160,80,.1)', color: '#22a050', border: '1px solid rgba(34,160,80,.2)' }}>
              {history.length} plants
            </span>
            <span className="text-xs font-body ml-1" style={{ color: '#aaa' }}>{showHistory ? '▲ hide' : '▼ show'}</span>
          </button>

          {showHistory && (
            historyLoading ? (
              <div className="flex items-center gap-2 py-8 text-gray-400 font-body text-sm">
                <Loader className="w-4 h-4 animate-spin" /> Loading history…
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12 rounded-2xl"
                style={{ background: '#fff', border: '1px solid rgba(255,215,0,.12)' }}>
                <Leaf className="w-10 h-10 mx-auto mb-4" style={{ color: 'rgba(34,160,80,.3)' }} />
                <p className="font-display font-bold text-green-900 mb-1">No plants identified yet</p>
                <p className="font-body text-sm text-gray-400">Scan your first plant above to build your history.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((plant, idx) => (
                  <div key={plant.id}
                    className="rounded-2xl overflow-hidden interactive-card fade-in-up"
                    style={{
                      background: 'linear-gradient(145deg,#071c0f,#0a3d1f)',
                      border: '1px solid rgba(255,215,0,.15)',
                      transition: 'all .25s cubic-bezier(0.16,1,0.3,1)',
                      animationDelay: `${idx * 0.06}s`,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,215,0,.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,215,0,.15)'; }}>
                    {plant.image_url && (
                      <div className="relative" style={{ height: 110, overflow: 'hidden', background: '#0a3d1f' }}>
                        <img src={plant.image_url} alt={plant.common_name}
                          className="w-full h-full object-cover opacity-80"
                          onError={e => (e.currentTarget.style.display = 'none')} />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,15,8,0.7) 0%, transparent 60%)' }} />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-body font-bold"
                          style={{ background: 'rgba(0,0,0,.65)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.25)' }}>
                          {plant.confidence}%
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <p className="font-display font-bold text-sm mb-0.5" style={{ color: '#ffd700' }}>{plant.common_name}</p>
                      <p className="font-body text-xs italic mb-3" style={{ color: 'rgba(255,255,255,.5)' }}>{plant.scientific_name}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {plant.medicinal_uses?.slice(0, 2).map((u, i) => (
                          <span key={i} className="text-xs font-body px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(34,160,80,.15)', color: 'rgba(255,255,255,.8)', border: '1px solid rgba(34,160,80,.25)' }}>
                            {u.slice(0, 30)}{u.length > 30 ? '…' : ''}
                          </span>
                        ))}
                      </div>
                      <p className="font-body text-[11px]" style={{ color: 'rgba(187,244,210,.35)' }}>
                        {new Date(plant.created_at || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
