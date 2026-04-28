'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, Download, CheckCircle, FileText, Loader, Sparkles, Activity, Leaf, ChevronRight, Zap } from 'lucide-react'
import { matchRemedies, symptomCategories, Remedy } from '@/lib/matchRemedies'
import RemedyCard from '@/components/RemedyCard'

const CAT_ICONS: Record<string, string> = {
  'Pain & Discomfort':'🩹','Energy & Sleep':'⚡','Mental Wellness':'🧠',
  'Digestive Health':'🌿','Skin & Hair':'✨','Immune & Respiratory':'🛡️',
  'Heart & Circulation':'❤️','Hormones & Vitality':'⚗️','Detox & Metabolism':'🧪',
  'Bone & Joint':'💪','Eye & Ear':'👁️','Urinary & Kidney':'💧',
  'Nervous System':'🔋',"Men's Health":'♂️',"Women's Health":'♀️',
  "Children's Health":'👶','Dental & Oral':'😁','Infections & Antimicrobial':'🔬',
  'Cancer & Serious Support':'🌱','Aging & Longevity':'🌟',
}

function downloadPDF(results: Remedy[], symptoms: string[], freeText: string) {
  const date = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})
  const remedyHTML = results.map(r=>`
    <div class="remedy-card">
      <div class="remedy-header">
        <div><h3>${r.name}</h3><p class="scientific">${r.scientific_name||''}</p></div>
        <span class="potency potency-${r.potency.toLowerCase()}">${r.potency} Potency</span>
      </div>
      <div class="tags">${r.symptoms.slice(0,4).map(s=>`<span class="tag">${s}</span>`).join('')}</div>
      <p class="prep"><strong>How to use:</strong> ${r.preparation}</p>
      <p class="safety">⚠️ ${r.safety}</p>
    </div>`).join('')
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>Dr. Gideon Afolabi — Natural Wellness Report</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;color:#0d1f12}
    .header{background:#0a3d1f;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:white;padding:36px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid #ffd700}
    .brand h1{font-size:28px;color:#ffd700;margin-bottom:6px;letter-spacing:0.5px;font-family:Georgia,serif}
    .brand p{font-size:13px;color:#a8e6c0;text-transform:uppercase;letter-spacing:2.5px;font-weight:700;margin-top:2px}
    .date-badge{background:rgba(255,215,0,0.18);border:1.5px solid #ffd700;border-radius:8px;padding:8px 14px;font-size:12px;color:#ffd700;font-weight:600;white-space:nowrap}
    .content{padding:40px}.section-title{font-size:18px;font-weight:bold;color:#0a3d1f;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #ffd700}
    .symptom-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
    .symptom-chip{background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.4);border-radius:99px;padding:4px 12px;font-size:12px;color:#0a3d1f;font-weight:600}
    .remedy-card{border:1px solid rgba(34,160,80,0.2);border-radius:12px;padding:20px;margin-bottom:16px;page-break-inside:avoid}
    .remedy-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
    .remedy-header h3{font-size:16px;color:#0a3d1f;font-weight:bold}.scientific{font-size:11px;color:#999;font-style:italic;margin-top:2px}
    .potency{font-size:11px;font-weight:bold;padding:3px 10px;border-radius:99px}
    .potency-high{background:rgba(34,197,94,0.15);color:#16a34a}.potency-medium{background:rgba(245,158,11,0.15);color:#d97706}.potency-low{background:rgba(148,163,184,0.15);color:#64748b}
    .tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}.tag{background:#f0faf0;border:1px solid #c8e6c9;border-radius:99px;padding:2px 8px;font-size:11px;color:#145a2e}
    .prep{font-size:12px;color:#444;line-height:1.6;margin-bottom:8px}
    .safety{font-size:11px;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:8px}
    .footer{background:#f8fff4;border-top:1px solid rgba(34,160,80,0.2);padding:24px 40px;margin-top:40px}
    .footer p{font-size:11px;color:#666;line-height:1.6}
  </style></head><body>
  <div class="header">
    <div class="brand"><h1>🌿 Dr. Gideon Afolabi Wellness</h1><p>Natural Wellness Report — Herbal Wisdom Reviews</p></div>
    <div class="date-badge">Generated: ${date}</div>
  </div>
  <div class="content">
    <div class="section-title">Reported Symptoms</div>
    ${symptoms.length>0?`<div class="symptom-row">${symptoms.map(s=>`<span class="symptom-chip">${s}</span>`).join('')}</div>`:''}
    ${freeText?`<p style="font-size:13px;color:#444;margin-bottom:28px;font-style:italic">"${freeText}"</p>`:''}
    <div style="display:inline-block;background:linear-gradient(135deg,#ffd700,#e6c300);color:#0a3d1f;font-weight:bold;padding:4px 14px;border-radius:99px;font-size:13px;margin-bottom:20px">${results.length} Natural Remedies Found</div>
    <div class="section-title">Recommended Natural Remedies</div>
    ${remedyHTML}
  </div>
  <div class="footer">
    <p><strong>Disclaimer:</strong> For educational purposes only. Always consult a qualified healthcare provider.</p>
    <p style="margin-top:8px;color:#aaa">Dr. Gideon Afolabi Wellness · Herbal Wisdom Reviews · © ${new Date().getFullYear()}</p>
  </div></body></html>`
  const win=window.open('','_blank')
  if(win){win.document.write(html);win.document.close();setTimeout(()=>win.print(),500)}
}

export default function SymptomCheckerPage() {
  const [freeText, setFreeText] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [results, setResults] = useState<Remedy[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [symptomSearch, setSymptomSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Pain & Discomfort')
  const resultsRef = useRef<HTMLDivElement>(null)
  const categories = Object.keys(symptomCategories)

  const totalSymptoms = useMemo(()=>
    Object.values(symptomCategories).reduce((a,b)=>a+b.length,0),[])

  const visibleSymptoms = useMemo(()=>{
    const q = symptomSearch.toLowerCase().trim()
    if(!q) return symptomCategories[activeCategory]||[]
    const all: string[]=[]
    Object.values(symptomCategories).forEach(syms=>{
      syms.forEach(s=>{ if(s.toLowerCase().includes(q)) all.push(s) })
    })
    return all
  },[symptomSearch,activeCategory])

  // AUTO-SEARCH on symptom change — wrapped in try/catch/finally so spinner ALWAYS stops
  useEffect(()=>{
    if(selectedSymptoms.length===0){ setResults([]); setSearched(false); return }
    setLoading(true)
    const t = setTimeout(()=>{
      try {
        const matched = matchRemedies(selectedSymptoms.join(' '), 20)
        setResults(matched)
        setSearched(true)
      } catch(e){
        console.error(e)
        setResults([])
        setSearched(true)
      } finally {
        setLoading(false)
      }
    }, 400)
    return ()=>clearTimeout(t)
  },[selectedSymptoms])

  const handleSearch = ()=>{
    if(!freeText.trim()&&selectedSymptoms.length===0) return
    setLoading(true)
    setTimeout(()=>{
      try {
        const matched = matchRemedies([...selectedSymptoms,freeText].join(' '), 20)
        setResults(matched); setSearched(true)
      } catch(e){ setResults([]); setSearched(true) }
      finally { setLoading(false) }
    },600)
  }

  const toggleSymptom = (s: string)=>{
    setSelectedSymptoms(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s])
  }

  return (
    <div className="min-h-screen" style={{background:'#f0f4f0'}}>

      {/* ── Compact Hero ── */}
      <div className="bg-forest py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{backgroundImage:'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)',backgroundSize:'40px 40px'}}/>
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
            style={{background:'rgba(255,215,0,0.1)',border:'1px solid rgba(255,215,0,0.2)'}}>
            <Activity className="w-3.5 h-3.5" style={{color:'rgba(255,215,0,0.8)'}}/>
            <span className="text-xs font-body uppercase tracking-widest" style={{color:'rgba(255,215,0,0.8)'}}>AI-Powered Symptom Analysis</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
            How Are You <span className="gold-text">Feeling?</span>
          </h1>
          <p className="font-body max-w-lg mx-auto text-sm" style={{color:'rgba(187,244,210,0.75)'}}>
            Browse {totalSymptoms}+ symptoms — pick yours and see nature's best remedies instantly on the right.
          </p>
        </div>
      </div>

      {/* ── Main App Layout ── */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-5 items-start">

          {/* ════════════════════════════════
              LEFT PANEL — Dark Symptom Browser
              ════════════════════════════════ */}
          <div className="hidden lg:flex flex-col flex-shrink-0 overflow-hidden"
            style={{
              width:320,
              position:'sticky', top:84,
              height:'calc(100vh - 104px)',
              background:'linear-gradient(180deg,#071c0f 0%,#0a3d1f 100%)',
              borderRadius:20,
              border:'1px solid rgba(255,215,0,0.18)',
              boxShadow:'0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>

            {/* Panel top bar */}
            <div className="flex-shrink-0 px-4 pt-4 pb-3"
              style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{background:'rgba(255,215,0,0.15)',border:'1px solid rgba(255,215,0,0.25)'}}>
                    <Leaf className="w-3.5 h-3.5" style={{color:'#ffd700'}}/>
                  </div>
                  <div>
                    <p className="text-white font-body font-bold text-base">Symptom Browser</p>
                    <p className="text-xs font-body" style={{color:'rgba(187,244,210,0.4)'}}>{totalSymptoms} conditions listed</p>
                  </div>
                </div>
                {selectedSymptoms.length>0&&(
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-xs font-body font-bold px-2 py-0.5 rounded-full"
                      style={{background:'rgba(255,215,0,0.2)',color:'#ffd700',border:'1px solid rgba(255,215,0,0.3)'}}>
                      {selectedSymptoms.length} picked
                    </span>
                    <button onClick={()=>setSelectedSymptoms([])}
                      className="text-xs font-body" style={{color:'rgba(239,68,68,0.7)'}}>clear</button>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,215,0,0.14)'}}>
                <Search className="w-3.5 h-3.5 flex-shrink-0" style={{color:'rgba(255,215,0,0.55)'}}/>
                <input value={symptomSearch} onChange={e=>{setSymptomSearch(e.target.value)}}
                  placeholder="Search symptoms..."
                  className="flex-1 bg-transparent text-sm font-body outline-none"
                  style={{color:'rgba(255,255,255,0.9)',caretColor:'#ffd700'}}/>
                {symptomSearch&&(
                  <button onClick={()=>setSymptomSearch('')}>
                    <X className="w-3.5 h-3.5" style={{color:'rgba(255,255,255,0.35)'}}/>
                  </button>
                )}
              </div>
            </div>

            {/* Category tab strip — horizontal scroll */}
            {!symptomSearch&&(
              <div className="flex-shrink-0 scroll-x-dark overflow-x-auto px-3 py-2.5"
                style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <div className="flex gap-1.5" style={{minWidth:'max-content'}}>
                  {categories.map(cat=>(
                    <button key={cat} onClick={()=>setActiveCategory(cat)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-body font-semibold whitespace-nowrap transition-all"
                      style={activeCategory===cat
                        ?{background:'rgba(255,215,0,0.18)',color:'#ffd700',border:'1px solid rgba(255,215,0,0.3)'}
                        :{background:'rgba(255,255,255,0.04)',color:'rgba(187,244,210,0.55)',border:'1px solid transparent'}
                      }>
                      <span style={{fontSize:12}}>{CAT_ICONS[cat]||'🌿'}</span>
                      <span>{cat.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active category label */}
            <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between">
              <p className="text-xs font-body font-semibold uppercase tracking-widest"
                style={{color:'rgba(255,215,0,0.55)'}}>
                {symptomSearch
                  ? `${visibleSymptoms.length} results`
                  : `${CAT_ICONS[activeCategory]} ${activeCategory}`
                }
              </p>
              {!symptomSearch&&(
                <span className="text-xs font-body" style={{color:'rgba(187,244,210,0.35)'}}>
                  {symptomCategories[activeCategory]?.length} items
                </span>
              )}
            </div>

            {/* ── Symptom list — scrollable with visible gold scrollbar ── */}
            <div className="relative flex-1 overflow-hidden">
              {/* Top fade */}
              <div className="absolute top-0 left-0 right-0 h-4 z-10 pointer-events-none"
                style={{background:'linear-gradient(to bottom, rgba(7,28,15,0.8), transparent)'}}/>
              {/* Bottom fade — indicates more content */}
              <div className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none"
                style={{background:'linear-gradient(to top, rgba(7,28,15,0.95), transparent)'}}/>
              {/* Scroll hint text */}
              <div className="absolute bottom-1 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <span className="text-xs font-body" style={{color:'rgba(255,215,0,0.35)'}}>↓ scroll for more</span>
              </div>

              <div className="scroll-dark overflow-y-auto h-full px-3 pb-12 pt-1">
                {visibleSymptoms.length===0?(
                  <div className="text-center py-12">
                    <p className="text-sm font-body" style={{color:'rgba(187,244,210,0.35)'}}>No symptoms found</p>
                  </div>
                ):(
                  <div className="space-y-0.5">
                    {visibleSymptoms.map(s=>{
                      const active = selectedSymptoms.includes(s)
                      return (
                        <button key={s} onClick={()=>toggleSymptom(s)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                          style={active
                            ?{background:'rgba(255,215,0,0.13)',border:'1px solid rgba(255,215,0,0.28)'}
                            :{background:'transparent',border:'1px solid transparent'}
                          }
                          onMouseEnter={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.05)'}}
                          onMouseLeave={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.background='transparent'}}
                        >
                          {/* Custom checkbox */}
                          <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                            style={active
                              ?{background:'linear-gradient(135deg,#ffd700,#e6c300)',boxShadow:'0 0 10px rgba(255,215,0,0.5)'}
                              :{background:'rgba(255,255,255,0.06)',border:'1.5px solid rgba(255,215,0,0.22)'}
                            }>
                            {active&&(
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#0a3d1f" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-body capitalize flex-1"
                            style={{color:active?'#ffd700':'rgba(187,244,210,0.82)',fontWeight:active?'600':'400'}}>
                            {s}
                          </span>
                          {active&&<ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{color:'rgba(255,215,0,0.45)'}}/>}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ── Sticky Analyse button at bottom of left panel ── */}
            <div className="flex-shrink-0 p-3" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
              {selectedSymptoms.length>0?(
                <button onClick={()=>{
                    setLoading(true)
                    setTimeout(()=>{
                      try{const m=matchRemedies(selectedSymptoms.join(' '),20);setResults(m);setSearched(true)}
                      catch(e){setResults([]);setSearched(true)}
                      finally{setLoading(false)}
                      setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),100)
                    },400)
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body font-bold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background:'linear-gradient(135deg,#ffd700,#e6c300)',
                    color:'#0a3d1f',
                    boxShadow:'0 4px 20px rgba(255,215,0,0.45)',
                  }}>
                  <Zap className="w-4 h-4"/>
                  Analyse {selectedSymptoms.length} Symptom{selectedSymptoms.length>1?'s':''}
                </button>
              ):(
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body text-sm"
                  style={{background:'rgba(255,255,255,0.04)',color:'rgba(187,244,210,0.3)',border:'1px solid rgba(255,255,255,0.06)'}}>
                  <Leaf className="w-4 h-4"/>
                  Pick a symptom to begin
                </div>
              )}
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT PANEL — Results Dashboard
              ════════════════════════════════ */}
          <div className="flex-1 min-w-0">

            {/* Mobile symptom chips */}
            <div className="lg:hidden mb-4 rounded-2xl p-4 overflow-hidden"
              style={{background:'linear-gradient(135deg,#071c0f,#0a3d1f)',border:'1px solid rgba(255,215,0,0.15)'}}>
              <p className="font-body text-xs uppercase tracking-widest mb-3 font-semibold" style={{color:'rgba(255,215,0,0.7)'}}>Quick-select symptoms</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(symptomCategories).flat().slice(0,40).map(s=>(
                  <button key={s} onClick={()=>toggleSymptom(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-body capitalize transition-all"
                    style={selectedSymptoms.includes(s)
                      ?{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',fontWeight:'700'}
                      :{background:'rgba(255,255,255,0.07)',color:'rgba(187,244,210,0.8)',border:'1px solid rgba(255,215,0,0.15)'}
                    }>{s}</button>
                ))}
              </div>
              {selectedSymptoms.length>0&&(
                <button onClick={handleSearch}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body font-bold text-sm"
                  style={{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',boxShadow:'0 4px 16px rgba(255,215,0,0.4)'}}>
                  <Zap className="w-4 h-4"/> Analyse {selectedSymptoms.length} Symptoms
                </button>
              )}
            </div>

            {/* Selected chips strip */}
            {selectedSymptoms.length>0&&(
              <div className="rounded-2xl p-4 mb-4"
                style={{background:'white',border:'1px solid rgba(255,215,0,0.25)',boxShadow:'0 4px 20px rgba(10,61,31,0.06)'}}>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs uppercase tracking-widest font-body font-bold" style={{color:'#b87800'}}>
                    {selectedSymptoms.length} Symptom{selectedSymptoms.length>1?'s':''} Selected
                  </p>
                  <button onClick={()=>setSelectedSymptoms([])}
                    className="text-xs font-body hover:opacity-70 transition-opacity" style={{color:'#ef4444'}}>
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(s=>(
                    <span key={s} onClick={()=>toggleSymptom(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-body cursor-pointer capitalize flex items-center gap-1.5 transition-all hover:opacity-75"
                      style={{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',fontWeight:'600',boxShadow:'0 2px 8px rgba(255,215,0,0.3)'}}>
                      {s}<X className="w-3 h-3" style={{opacity:.6}}/>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Free text + search */}
            <div className="rounded-2xl mb-5 overflow-hidden"
              style={{background:'white',border:'1px solid rgba(255,215,0,0.18)',boxShadow:'0 4px 20px rgba(10,61,31,0.05)'}}>
              <div className="flex items-center gap-2 px-5 pt-4 pb-3"
                style={{borderBottom:'1px solid rgba(34,160,80,0.08)'}}>
                <Sparkles className="w-4 h-4" style={{color:'#ffd700'}}/>
                <span className="text-xs font-body uppercase tracking-widest" style={{color:'rgba(34,160,80,0.8)'}}>
                  Also describe in your own words (optional)
                </span>
              </div>
              <div className="p-4">
                <textarea value={freeText} onChange={e=>setFreeText(e.target.value)}
                  placeholder="e.g. I feel bloated after meals, have trouble sleeping and notice hair thinning..."
                  className="w-full h-24 resize-none font-body text-sm text-gray-700 bg-transparent outline-none leading-relaxed"
                  maxLength={300}/>
                <div className="flex items-center justify-between border-t pt-2.5 mt-1"
                  style={{borderColor:'rgba(34,160,80,0.08)'}}>
                  <div className="flex items-center gap-2 flex-1 mr-4">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{background:'rgba(34,160,80,0.1)'}}>
                      <div className="h-full rounded-full transition-all"
                        style={{width:`${(freeText.length/300)*100}%`,background:freeText.length>250?'linear-gradient(90deg,#f59e0b,#ef4444)':'linear-gradient(90deg,#22a050,#ffd700)'}}/>
                    </div>
                    <span className="text-xs text-gray-400 font-body flex-shrink-0">{freeText.length}/300</span>
                  </div>
                  {freeText&&<button onClick={()=>setFreeText('')} className="text-xs font-body flex items-center gap-1" style={{color:'#ef4444'}}><X className="w-3 h-3"/>Clear</button>}
                </div>
              </div>
            </div>

            {/* Search button (for free text or combined) */}
            <button onClick={handleSearch}
              disabled={loading||(!freeText.trim()&&selectedSymptoms.length===0)}
              className="w-full flex items-center justify-center gap-3 text-base font-body font-bold rounded-2xl py-4 mb-6 transition-all"
              style={{
                background:(freeText.trim()||selectedSymptoms.length>0)?'linear-gradient(135deg,#0a3d1f,#145a2e)':'rgba(0,0,0,0.06)',
                color:(freeText.trim()||selectedSymptoms.length>0)?'#ffd700':'#aaa',
                cursor:(freeText.trim()||selectedSymptoms.length>0)?'pointer':'not-allowed',
                boxShadow:(freeText.trim()||selectedSymptoms.length>0)?'0 8px 28px rgba(10,61,31,0.3)':'none',
                border:(freeText.trim()||selectedSymptoms.length>0)?'1px solid rgba(255,215,0,0.2)':'1px solid transparent',
              }}>
              {loading
                ?<><Loader className="w-5 h-5 animate-spin"/>Analysing your symptoms...</>
                :<><Search className="w-5 h-5"/>Find Natural Remedies</>
              }
            </button>

            {/* ── Results area ── */}
            <div ref={resultsRef}>

              {/* Loading skeleton */}
              {loading&&(
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(34,160,80,0.1))'}}>
                      <Leaf className="w-5 h-5 animate-pulse" style={{color:'#ffd700'}}/>
                    </div>
                    <div>
                      <p className="font-display font-bold text-green-900">Searching Nature's Pharmacy…</p>
                      <p className="text-xs font-body text-gray-400">Matching against 500+ herbal remedies</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map(i=>(
                      <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                        style={{background:'white',border:'1px solid rgba(255,215,0,0.1)',height:220}}>
                        <div style={{height:40,background:'rgba(34,160,80,0.06)'}}/>
                        <div className="p-4 space-y-3">
                          <div style={{height:16,borderRadius:8,background:'rgba(0,0,0,0.06)',width:'60%'}}/>
                          <div style={{height:12,borderRadius:8,background:'rgba(0,0,0,0.04)',width:'40%'}}/>
                          <div className="flex gap-2 flex-wrap">
                            {[1,2,3].map(j=><div key={j} style={{height:24,width:60,borderRadius:99,background:'rgba(34,160,80,0.07)'}}/>)}
                          </div>
                          <div style={{height:12,borderRadius:8,background:'rgba(0,0,0,0.04)'}}/>
                          <div style={{height:12,borderRadius:8,background:'rgba(0,0,0,0.04)',width:'80%'}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {!loading&&searched&&(
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-2"
                        style={{
                          background:results.length>0?'rgba(34,160,80,0.1)':'rgba(239,68,68,0.1)',
                          border:`1px solid ${results.length>0?'rgba(34,160,80,0.3)':'rgba(239,68,68,0.3)'}`,
                        }}>
                        {results.length>0
                          ?<CheckCircle className="w-3.5 h-3.5" style={{color:'#22a050'}}/>
                          :<X className="w-3.5 h-3.5 text-red-500"/>
                        }
                        <span className="text-xs font-body font-bold uppercase tracking-widest"
                          style={{color:results.length>0?'#22a050':'#ef4444'}}>
                          {results.length>0?`${results.length} remedies matched`:'No matches found'}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-green-900">
                        {results.length>0?'Your Personalised Remedy Plan':'Try Different Symptoms'}
                      </h2>
                      {results.length>0&&(
                        <p className="text-sm font-body mt-1" style={{color:'rgba(100,130,110,0.75)'}}>
                          Ranked by relevance · sorted by potency
                        </p>
                      )}
                    </div>
                    {results.length>0&&(
                      <button onClick={()=>downloadPDF(results,selectedSymptoms,freeText)}
                        className="flex items-center gap-2 font-body font-bold text-sm px-5 py-3 rounded-xl transition-all hover:scale-105 flex-shrink-0"
                        style={{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',boxShadow:'0 4px 16px rgba(255,215,0,0.35)'}}>
                        <Download className="w-4 h-4"/>Download PDF Report
                      </button>
                    )}
                  </div>

                  <div className="h-px mb-6" style={{background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.4),transparent)'}}/>

                  {results.length>0?(
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {results.map(remedy=><RemedyCard key={remedy.id} remedy={remedy}/>)}
                    </div>
                  ):(
                    <div className="text-center py-16 rounded-2xl"
                      style={{background:'white',border:'1px solid rgba(255,215,0,0.12)'}}>
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300"/>
                      <p className="font-display text-lg text-gray-400 mb-2">No exact matches found</p>
                      <p className="text-sm text-gray-400 font-body mb-6">Try selecting different symptoms or browsing the full encyclopedia</p>
                      <Link href="/encyclopedia" className="btn-gold text-sm inline-block">Browse All 500+ Remedies</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Empty state */}
              {!loading&&!searched&&(
                <div className="text-center py-16 rounded-2xl"
                  style={{background:'white',border:'1px solid rgba(255,215,0,0.1)',boxShadow:'0 4px 24px rgba(10,61,31,0.04)'}}>
                  <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{background:'linear-gradient(135deg,rgba(255,215,0,0.08),rgba(34,160,80,0.06))',border:'1px solid rgba(255,215,0,0.18)'}}>
                    <Activity className="w-9 h-9" style={{color:'rgba(34,160,80,0.4)'}}/>
                  </div>
                  <p className="font-display text-xl text-green-900 mb-2">Your remedy plan appears here</p>
                  <p className="text-sm font-body text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Select symptoms from the left panel — results update <strong>instantly</strong> as you pick.
                  </p>
                  <div className="flex justify-center gap-6 mt-8">
                    {['anxiety','headache','fatigue','digestion','insomnia'].map(s=>(
                      <button key={s} onClick={()=>toggleSymptom(s)}
                        className="px-3 py-2 rounded-xl text-xs font-body capitalize transition-all hover:scale-105"
                        style={{background:'rgba(34,160,80,0.08)',color:'#145a2e',border:'1px solid rgba(34,160,80,0.18)'}}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
