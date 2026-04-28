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
    <div className="min-h-screen" style={{background:'#f5f2ed'}}>

      {/* ── Hero ── */}
      <div className="bg-forest py-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{backgroundImage:'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)',backgroundSize:'40px 40px'}}/>
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
            style={{background:'rgba(255,215,0,0.1)',border:'1px solid rgba(255,215,0,0.2)'}}>
            <Activity className="w-3.5 h-3.5" style={{color:'rgba(255,215,0,0.8)'}}/>
            <span className="text-xs font-body uppercase tracking-widest" style={{color:'rgba(255,215,0,0.8)'}}>AI-Powered Symptom Analysis</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            How Are You <span className="gold-text">Feeling?</span>
          </h1>
          <p className="font-body max-w-lg mx-auto text-sm" style={{color:'rgba(187,244,210,0.75)'}}>
            Browse {totalSymptoms}+ symptoms — pick yours and see nature's best remedies instantly.
          </p>
        </div>
      </div>

      {/* ── Main Split Layout — side-by-side on ALL screen sizes ── */}
      <div className="max-w-screen-xl mx-auto px-2 sm:px-3 lg:px-4 py-3 sm:py-5">
        <div className="flex gap-2 sm:gap-3 lg:gap-5 items-start">

          {/* ════════════════════════════════
              LEFT PANEL — Dark Symptom Browser
              Visible on ALL screen sizes
              ════════════════════════════════ */}
          <div
            className="flex flex-col flex-shrink-0 overflow-hidden"
            style={{
              width: 'clamp(140px, 38vw, 320px)',
              position: 'sticky',
              top: 72,
              height: 'calc(100vh - 92px)',
              background: 'linear-gradient(180deg,#071c0f 0%,#0a3d1f 100%)',
              borderRadius: 16,
              border: '1px solid rgba(255,215,0,0.18)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>

            {/* Panel top bar */}
            <div className="flex-shrink-0 px-2 sm:px-3 lg:px-4 pt-3 pb-2"
              style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{background:'rgba(255,215,0,0.15)',border:'1px solid rgba(255,215,0,0.25)'}}>
                    <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{color:'#ffd700'}}/>
                  </div>
                  <div>
                    <p className="text-white font-body font-bold leading-tight"
                      style={{fontSize:'clamp(11px, 2.2vw, 15px)'}}>
                      Symptom Browser
                    </p>
                    <p className="font-body leading-none hidden sm:block"
                      style={{fontSize:'clamp(9px, 1.5vw, 11px)', color:'rgba(187,244,210,0.4)'}}>
                      {totalSymptoms} listed
                    </p>
                  </div>
                </div>
                {selectedSymptoms.length>0&&(
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-body font-bold px-1.5 py-0.5 rounded-full"
                      style={{fontSize:'clamp(9px,1.8vw,11px)',background:'rgba(255,215,0,0.2)',color:'#ffd700',border:'1px solid rgba(255,215,0,0.3)'}}>
                      {selectedSymptoms.length}✓
                    </span>
                    <button onClick={()=>setSelectedSymptoms([])}
                      className="font-body" style={{fontSize:'clamp(8px,1.5vw,10px)',color:'rgba(239,68,68,0.7)'}}>
                      clear
                    </button>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl"
                style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,215,0,0.14)'}}>
                <Search className="w-3 h-3 flex-shrink-0" style={{color:'rgba(255,215,0,0.55)'}}/>
                <input value={symptomSearch} onChange={e=>setSymptomSearch(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 bg-transparent font-body outline-none min-w-0"
                  style={{fontSize:'clamp(10px,2vw,13px)',color:'rgba(255,255,255,0.9)',caretColor:'#ffd700'}}/>
                {symptomSearch&&(
                  <button onClick={()=>setSymptomSearch('')}>
                    <X className="w-3 h-3" style={{color:'rgba(255,255,255,0.35)'}}/>
                  </button>
                )}
              </div>
            </div>

            {/* Category tabs — horizontal scroll */}
            {!symptomSearch&&(
              <div className="flex-shrink-0 scroll-x-dark overflow-x-auto px-2 py-2"
                style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <div className="flex gap-1" style={{minWidth:'max-content'}}>
                  {categories.map(cat=>(
                    <button key={cat} onClick={()=>setActiveCategory(cat)}
                      className="flex items-center gap-0.5 rounded-lg font-body font-semibold whitespace-nowrap transition-all"
                      style={{
                        fontSize:'clamp(9px,1.8vw,11px)',
                        padding:'4px 6px',
                        ...(activeCategory===cat
                          ?{background:'rgba(255,215,0,0.18)',color:'#ffd700',border:'1px solid rgba(255,215,0,0.3)'}
                          :{background:'rgba(255,255,255,0.04)',color:'rgba(187,244,210,0.55)',border:'1px solid transparent'})
                      }}>
                      <span style={{fontSize:'clamp(9px,1.8vw,11px)'}}>{CAT_ICONS[cat]||'🌿'}</span>
                      <span className="hidden sm:inline">{cat.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active category label */}
            <div className="flex-shrink-0 px-2 sm:px-3 py-1.5 flex items-center justify-between">
              <p className="font-body font-semibold uppercase tracking-wider truncate"
                style={{fontSize:'clamp(8px,1.6vw,11px)',color:'rgba(255,215,0,0.55)'}}>
                {symptomSearch
                  ? `${visibleSymptoms.length} results`
                  : `${CAT_ICONS[activeCategory]} ${activeCategory.split(' ')[0]}`
                }
              </p>
              {!symptomSearch&&(
                <span className="font-body flex-shrink-0 ml-1"
                  style={{fontSize:'clamp(8px,1.4vw,10px)',color:'rgba(187,244,210,0.35)'}}>
                  {symptomCategories[activeCategory]?.length}
                </span>
              )}
            </div>

            {/* Symptom list — scrollable */}
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 z-10 pointer-events-none"
                style={{background:'linear-gradient(to bottom, rgba(7,28,15,0.8), transparent)'}}/>
              <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
                style={{background:'linear-gradient(to top, rgba(7,28,15,0.95), transparent)'}}/>
              <div className="absolute bottom-1 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <span className="font-body" style={{fontSize:'clamp(8px,1.5vw,10px)',color:'rgba(255,215,0,0.35)'}}>↓ more</span>
              </div>

              <div className="scroll-dark overflow-y-auto h-full px-1.5 sm:px-2 pb-10 pt-1">
                {visibleSymptoms.length===0?(
                  <div className="text-center py-8">
                    <p className="font-body" style={{fontSize:11,color:'rgba(187,244,210,0.35)'}}>None found</p>
                  </div>
                ):(
                  <div className="space-y-0.5">
                    {visibleSymptoms.map(s=>{
                      const active = selectedSymptoms.includes(s)
                      return (
                        <button key={s} onClick={()=>toggleSymptom(s)}
                          className="w-full flex items-center gap-1.5 sm:gap-2 px-2 py-2 rounded-xl text-left transition-all"
                          style={active
                            ?{background:'rgba(255,215,0,0.13)',border:'1px solid rgba(255,215,0,0.28)'}
                            :{background:'transparent',border:'1px solid transparent'}
                          }
                          onMouseEnter={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.05)'}}
                          onMouseLeave={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.background='transparent'}}
                        >
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                            style={active
                              ?{background:'linear-gradient(135deg,#ffd700,#e6c300)',boxShadow:'0 0 8px rgba(255,215,0,0.5)'}
                              :{background:'rgba(255,255,255,0.06)',border:'1.5px solid rgba(255,215,0,0.22)'}
                            }>
                            {active&&(
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="#0a3d1f" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </svg>
                            )}
                          </div>
                          <span className="font-body capitalize flex-1 truncate"
                            style={{
                              fontSize:'clamp(10px,2vw,13px)',
                              color:active?'#ffd700':'rgba(187,244,210,0.82)',
                              fontWeight:active?'600':'400'
                            }}>
                            {s}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Analyse button */}
            <div className="flex-shrink-0 p-2 sm:p-3" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
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
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl font-body font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    padding:'clamp(8px,2vw,12px) 8px',
                    fontSize:'clamp(10px,2vw,13px)',
                    background:'linear-gradient(135deg,#ffd700,#e6c300)',
                    color:'#0a3d1f',
                    boxShadow:'0 4px 20px rgba(255,215,0,0.45)',
                  }}>
                  <Zap style={{width:'clamp(12px,2.5vw,16px)',height:'clamp(12px,2.5vw,16px)'}}/>
                  <span>Analyse {selectedSymptoms.length}</span>
                </button>
              ):(
                <div className="w-full flex items-center justify-center gap-1 rounded-xl font-body"
                  style={{
                    padding:'clamp(8px,2vw,12px) 8px',
                    fontSize:'clamp(9px,1.8vw,12px)',
                    background:'rgba(255,255,255,0.04)',
                    color:'rgba(187,244,210,0.3)',
                    border:'1px solid rgba(255,255,255,0.06)'
                  }}>
                  <Leaf style={{width:12,height:12}}/>
                  <span>Pick a symptom</span>
                </div>
              )}
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT PANEL — Results Dashboard
              ════════════════════════════════ */}
          <div className="flex-1 min-w-0">

            {/* Selected chips strip */}
            {selectedSymptoms.length>0&&(
              <div className="rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4"
                style={{background:'white',border:'1px solid rgba(255,215,0,0.25)',boxShadow:'0 4px 20px rgba(10,61,31,0.06)'}}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-widest font-body font-bold" style={{color:'#b87800'}}>
                    {selectedSymptoms.length} Selected
                  </p>
                  <button onClick={()=>setSelectedSymptoms([])}
                    className="text-xs font-body hover:opacity-70 transition-opacity" style={{color:'#ef4444'}}>
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms.map(s=>(
                    <span key={s} onClick={()=>toggleSymptom(s)}
                      className="px-2.5 py-1 rounded-full text-xs font-body cursor-pointer capitalize flex items-center gap-1 transition-all hover:opacity-75"
                      style={{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',fontWeight:'600',boxShadow:'0 2px 8px rgba(255,215,0,0.3)'}}>
                      {s}<X className="w-2.5 h-2.5" style={{opacity:.6}}/>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Free text */}
            <div className="rounded-2xl mb-3 sm:mb-4 overflow-hidden"
              style={{background:'white',border:'1px solid rgba(255,215,0,0.18)',boxShadow:'0 4px 20px rgba(10,61,31,0.05)'}}>
              <div className="flex items-center gap-2 px-3 sm:px-5 pt-3 pb-2"
                style={{borderBottom:'1px solid rgba(34,160,80,0.08)'}}>
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{color:'#ffd700'}}/>
                <span className="text-xs font-body uppercase tracking-widest" style={{color:'rgba(34,160,80,0.8)'}}>
                  <span className="hidden sm:inline">Describe in your own words </span>
                  <span className="sm:hidden">Optional details </span>
                  (optional)
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <textarea value={freeText} onChange={e=>setFreeText(e.target.value)}
                  placeholder="e.g. bloated after meals, trouble sleeping..."
                  className="w-full resize-none font-body text-sm text-gray-700 bg-transparent outline-none leading-relaxed"
                  style={{height:'clamp(60px,12vw,96px)'}}
                  maxLength={300}/>
                <div className="flex items-center justify-between border-t pt-2"
                  style={{borderColor:'rgba(34,160,80,0.08)'}}>
                  <div className="flex items-center gap-2 flex-1 mr-3">
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

            {/* Search / Find button */}
            <button onClick={handleSearch}
              disabled={loading||(!freeText.trim()&&selectedSymptoms.length===0)}
              className="w-full flex items-center justify-center gap-2 font-body font-bold rounded-2xl mb-4 transition-all"
              style={{
                fontSize:'clamp(12px,2.5vw,16px)',
                padding:'clamp(10px,2.5vw,16px)',
                background:(freeText.trim()||selectedSymptoms.length>0)?'linear-gradient(135deg,#0a3d1f,#145a2e)':'rgba(0,0,0,0.06)',
                color:(freeText.trim()||selectedSymptoms.length>0)?'#ffd700':'#aaa',
                cursor:(freeText.trim()||selectedSymptoms.length>0)?'pointer':'not-allowed',
                boxShadow:(freeText.trim()||selectedSymptoms.length>0)?'0 8px 28px rgba(10,61,31,0.3)':'none',
                border:(freeText.trim()||selectedSymptoms.length>0)?'1px solid rgba(255,215,0,0.2)':'1px solid transparent',
              }}>
              {loading
                ?<><Loader className="w-4 h-4 animate-spin"/>Analysing…</>
                :<><Search className="w-4 h-4"/>Find Natural Remedies</>
              }
            </button>

            {/* Results area */}
            <div ref={resultsRef}>

              {/* Loading skeleton */}
              {loading&&(
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(34,160,80,0.1))'}}>
                      <Leaf className="w-4 h-4 animate-pulse" style={{color:'#ffd700'}}/>
                    </div>
                    <div>
                      <p className="font-display font-bold text-green-900 text-sm sm:text-base">Searching Nature's Pharmacy…</p>
                      <p className="text-xs font-body text-gray-400">Matching against 500+ herbal remedies</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1,2,3,4].map(i=>(
                      <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                        style={{background:'white',border:'1px solid rgba(255,215,0,0.1)',height:180}}>
                        <div style={{height:36,background:'rgba(34,160,80,0.06)'}}/>
                        <div className="p-3 space-y-2">
                          <div style={{height:14,borderRadius:8,background:'rgba(0,0,0,0.06)',width:'60%'}}/>
                          <div style={{height:11,borderRadius:8,background:'rgba(0,0,0,0.04)',width:'40%'}}/>
                          <div className="flex gap-2">
                            {[1,2].map(j=><div key={j} style={{height:22,width:50,borderRadius:99,background:'rgba(34,160,80,0.07)'}}/>)}
                          </div>
                          <div style={{height:11,borderRadius:8,background:'rgba(0,0,0,0.04)'}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {!loading&&searched&&(
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
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
                          {results.length>0?`${results.length} matched`:'No matches'}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-green-900"
                        style={{fontSize:'clamp(16px,3.5vw,24px)'}}>
                        {results.length>0?'Your Remedy Plan':'Try Different Symptoms'}
                      </h2>
                    </div>
                    {results.length>0&&(
                      <button onClick={()=>downloadPDF(results,selectedSymptoms,freeText)}
                        className="flex items-center gap-2 font-body font-bold text-xs sm:text-sm px-3 sm:px-5 py-2.5 rounded-xl transition-all hover:scale-105 flex-shrink-0"
                        style={{background:'linear-gradient(135deg,#ffd700,#e6c300)',color:'#0a3d1f',boxShadow:'0 4px 16px rgba(255,215,0,0.35)'}}>
                        <Download className="w-3.5 h-3.5"/>
                        <span className="hidden sm:inline">Download PDF Report</span>
                        <span className="sm:hidden">PDF</span>
                      </button>
                    )}
                  </div>

                  <div className="h-px mb-4" style={{background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.4),transparent)'}}/>

                  {results.length>0?(
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {results.map(remedy=><RemedyCard key={remedy.id} remedy={remedy}/>)}
                    </div>
                  ):(
                    <div className="text-center py-12 rounded-2xl"
                      style={{background:'white',border:'1px solid rgba(255,215,0,0.12)'}}>
                      <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300"/>
                      <p className="font-display text-base text-gray-400 mb-2">No exact matches found</p>
                      <p className="text-xs text-gray-400 font-body mb-5">Try selecting different symptoms</p>
                      <Link href="/encyclopedia" className="btn-gold text-sm inline-block">Browse All Remedies</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Empty state */}
              {!loading&&!searched&&(
                <div className="text-center py-10 sm:py-14 rounded-2xl"
                  style={{background:'white',border:'1px solid rgba(255,215,0,0.1)',boxShadow:'0 4px 24px rgba(10,61,31,0.04)'}}>
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{background:'linear-gradient(135deg,rgba(255,215,0,0.08),rgba(34,160,80,0.06))',border:'1px solid rgba(255,215,0,0.18)'}}>
                    <Activity className="w-6 h-6 sm:w-9 sm:h-9" style={{color:'rgba(34,160,80,0.4)'}}/>
                  </div>
                  <p className="font-display font-bold text-green-900 mb-2"
                    style={{fontSize:'clamp(14px,3vw,20px)'}}>
                    Your remedy plan appears here
                  </p>
                  <p className="text-xs sm:text-sm font-body text-gray-400 max-w-xs mx-auto leading-relaxed px-4">
                    Select from the left panel — results update <strong>instantly</strong>.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 px-2 sm:px-4 w-full max-w-xs mx-auto">
                    {['anxiety','headache','fatigue','digestion','insomnia'].map((s,i)=>(
                      <button key={s} onClick={()=>toggleSymptom(s)}
                        className={`py-2 rounded-xl font-body capitalize transition-all hover:scale-105 text-center${i===4?' col-span-2 sm:col-span-1':''}`}
                        style={{fontSize:'clamp(10px,2.2vw,12px)',background:'rgba(34,160,80,0.08)',color:'#145a2e',border:'1px solid rgba(34,160,80,0.18)'}}>
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
