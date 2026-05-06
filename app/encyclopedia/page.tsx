'use client'
import { useState, useMemo } from 'react'
import { Search, BookOpen, SlidersHorizontal, Tag, X, Sparkles, Filter } from 'lucide-react'
import remediesData from '@/data/remedies.json'
import RemedyCard from '@/components/RemedyCard'
import { Remedy } from '@/lib/matchRemedies'

const remedies = remediesData as Remedy[]
const categories = ['All', ...Array.from(new Set(remedies.map(r => r.category))).sort()]
const potencies = ['All', 'High', 'Medium', 'Low']

function normalisePotency(p: unknown): string {
  if (typeof p === 'string') return p
  if (typeof p === 'number') {
    if (p >= 4.5) return 'High'
    if (p >= 4.2) return 'Medium'
    return 'Low'
  }
  return 'Low'
}

const allAilments: string[] = ['All', ...Array.from(
  new Set(remedies.flatMap(r => r.symptoms.map(s => s.toLowerCase().trim())))
).sort()]

const popularAilments = ['anxiety', 'inflammation', 'digestion', 'diabetes', 'insomnia', 'hypertension', 'immunity', 'arthritis', 'pain', 'liver', 'skin', 'stress']

export default function EncyclopediaPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [potency, setPotency] = useState('All')
  const [ailment, setAilment] = useState('All')
  const [ailmentSearch, setAilmentSearch] = useState('')
  const [showAilmentDropdown, setShowAilmentDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  const filteredAilments = useMemo(() => {
    if (!ailmentSearch) return allAilments
    const q = ailmentSearch.toLowerCase()
    return allAilments.filter(a => a === 'All' || a.includes(q))
  }, [ailmentSearch])

  const filtered = useMemo(() => {
    return remedies.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !q || r.name.toLowerCase().includes(q) ||
        r.symptoms.some(s => s.toLowerCase().includes(q)) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      const matchCategory = category === 'All' || r.category === category
      const matchPotency = potency === 'All' || normalisePotency(r.potency) === potency
      const matchAilment = ailment === 'All' || r.symptoms.some(s => s.toLowerCase().trim() === ailment)
      return matchSearch && matchCategory && matchPotency && matchAilment
    })
  }, [search, category, potency, ailment])

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const hasFilters = search || category !== 'All' || potency !== 'All' || ailment !== 'All'

  const clearAll = () => {
    setSearch(''); setCategory('All'); setPotency('All'); setAilment('All')
    setAilmentSearch(''); setPage(1)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 60%, #f5f3ee 100%)' }}>

      {/* ── Hero — animated gradient ── */}
      <div className="encyclopedia-hero py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.55) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute -top-20 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.07), transparent 65%)' }} />
        <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,160,80,0.07), transparent 65%)' }} />

        <div className="text-center relative fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(255,215,0,0.10)', border: '1px solid rgba(255,215,0,0.25)' }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'rgba(255,215,0,0.85)' }} />
            <span className="text-[11px] font-body uppercase tracking-[0.18em]" style={{ color: 'rgba(255,215,0,0.85)' }}>Global Healing Database</span>
          </div>
          <h1 className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2.5rem,5.5vw,4rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            Herbal <span className="shimmer-gold-slow">Encyclopedia</span>
          </h1>
          <p className="font-body max-w-xl mx-auto mb-8" style={{ color: 'rgba(187,244,210,0.75)', fontSize: '1.05rem' }}>
            Browse our database of {remedies.length}+ natural remedies from healing traditions across the globe.
          </p>

          {/* Live stats row */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { val: `${remedies.length}+`, label: 'Remedies' },
              { val: '6', label: 'Traditions' },
              { val: `${categories.length - 1}`, label: 'Categories' },
              { val: `${allAilments.length - 1}+`, label: 'Ailments' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-xl shimmer-gold-slow">{s.val}</div>
                <div className="font-body text-[11px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Active ailment banner */}
        {ailment !== 'All' && (
          <div className="mb-6 rounded-2xl px-5 py-4 flex items-center gap-3 fade-in-up"
            style={{ background: 'linear-gradient(135deg, rgba(10,61,31,0.96), rgba(5,46,15,0.96))', border: '1px solid rgba(255,215,0,0.3)', boxShadow: '0 4px 24px rgba(10,61,31,0.2)' }}>
            <Tag className="w-4 h-4 flex-shrink-0" style={{ color: '#ffd700' }} />
            <p className="font-body text-sm flex-1" style={{ color: 'rgba(187,244,210,0.9)' }}>
              Showing all remedies that help with&nbsp;
              <span className="font-bold capitalize" style={{ color: '#ffd700' }}>{ailment}</span>
              &nbsp;<span style={{ color: 'rgba(255,255,255,0.45)' }}>({filtered.length} found)</span>
            </p>
            <button onClick={() => { setAilment('All'); setPage(1) }}
              className="flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)' }}>
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        )}

        {/* ── Premium Filter Bar — glassmorphism ── */}
        <div className="rounded-3xl mb-8 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,215,0,0.18)', boxShadow: '0 8px 40px rgba(10,61,31,0.09), 0 1px 4px rgba(0,0,0,0.04)' }}>

          {/* Top row — search + actions */}
          <div className="p-4 sm:p-5" style={{ borderBottom: '1px solid rgba(34,160,80,0.08)' }}>
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="flex-1 min-w-52 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
                style={{ background: '#f5f3ee', border: '1.5px solid rgba(34,160,80,0.15)' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,215,0,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(34,160,80,0.15)')}>
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#22a050' }} />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search remedies, symptoms, or tags…"
                  className="flex-1 bg-transparent text-sm font-body outline-none text-gray-700 placeholder-gray-400"
                />
                {search && (
                  <button onClick={() => setSearch('')}><X className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} /></button>
                )}
              </div>

              {/* Category dropdown */}
              <div className="flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer transition-all hover:border-yellow-300"
                style={{ background: '#f5f3ee', border: '1.5px solid rgba(34,160,80,0.15)' }}>
                <SlidersHorizontal className="w-4 h-4 text-green-600" />
                <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}
                  className="text-sm font-body outline-none cursor-pointer bg-transparent"
                  style={{ color: '#0a3d1f' }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Potency dropdown */}
              <div className="flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer transition-all hover:border-yellow-300"
                style={{ background: '#f5f3ee', border: '1.5px solid rgba(34,160,80,0.15)' }}>
                <select value={potency} onChange={e => { setPotency(e.target.value); setPage(1) }}
                  className="text-sm font-body outline-none cursor-pointer bg-transparent"
                  style={{ color: '#0a3d1f' }}>
                  {potencies.map(p => <option key={p} value={p}>{p === 'All' ? 'All Potency' : `${p} Potency`}</option>)}
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2.5">
                <span className="results-badge">{filtered.length} results</span>
                {hasFilters && (
                  <button onClick={clearAll}
                    className="flex items-center gap-1.5 text-xs font-body px-3 py-2 rounded-full transition-all hover:scale-105"
                    style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Ailment filter section */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3.5">
              <Tag className="w-3.5 h-3.5" style={{ color: '#22a050' }} />
              <span className="text-xs font-body font-semibold uppercase tracking-widest" style={{ color: '#145a2e' }}>
                Filter by Ailment
              </span>
              <span className="text-xs font-body" style={{ color: 'rgba(100,130,110,0.7)' }}>— pick a condition</span>
            </div>

            {/* Custom searchable ailment picker */}
            <div className="flex flex-wrap items-start gap-3">
              <div className="relative">
                <div
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all min-w-[200px]"
                  style={{
                    background: ailment !== 'All' ? 'rgba(255,215,0,0.08)' : '#f5f3ee',
                    border: ailment !== 'All' ? '1.5px solid rgba(255,215,0,0.45)' : '1.5px solid rgba(34,160,80,0.15)',
                  }}
                  onClick={() => setShowAilmentDropdown(v => !v)}>
                  <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ailment !== 'All' ? '#b87800' : '#22a050' }} />
                  <span className="text-sm font-body flex-1 capitalize"
                    style={{ color: ailment !== 'All' ? '#b87800' : '#6b7280' }}>
                    {ailment === 'All' ? 'All Ailments' : ailment}
                  </span>
                  {ailment !== 'All' && (
                    <span className="text-xs font-body font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,215,0,0.2)', color: '#b87800' }}>{filtered.length}</span>
                  )}
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94a3b8', transform: showAilmentDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {showAilmentDropdown && (
                  <div className="absolute left-0 top-full mt-1.5 z-30 rounded-2xl overflow-hidden"
                    style={{ width: 320, background: 'white', border: '1px solid rgba(34,160,80,0.2)', boxShadow: '0 12px 40px rgba(10,61,31,0.15)' }}>
                    <div className="p-2.5" style={{ borderBottom: '1px solid rgba(34,160,80,0.1)' }}>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{ background: '#f5f3ee', border: '1px solid rgba(34,160,80,0.15)' }}>
                        <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22a050' }} />
                        <input autoFocus value={ailmentSearch} onChange={e => setAilmentSearch(e.target.value)}
                          placeholder="Search ailments…"
                          className="flex-1 bg-transparent text-sm font-body outline-none text-gray-700 placeholder-gray-400"
                          onClick={e => e.stopPropagation()} />
                        {ailmentSearch && <button onClick={e => { e.stopPropagation(); setAilmentSearch('') }}><X className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} /></button>}
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 260 }}>
                      {filteredAilments.length === 0 ? (
                        <p className="text-center py-6 text-sm font-body text-gray-400">No ailments found</p>
                      ) : filteredAilments.map(a => {
                        const count = a === 'All' ? remedies.length
                          : remedies.filter(r => r.symptoms.some(s => s.toLowerCase().trim() === a)).length
                        const isSelected = ailment === a
                        return (
                          <button key={a}
                            onClick={() => { setAilment(a); setPage(1); setShowAilmentDropdown(false); setAilmentSearch('') }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-all"
                            style={{ background: isSelected ? 'rgba(255,215,0,0.08)' : 'transparent', borderBottom: '1px solid rgba(34,160,80,0.06)' }}
                            onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = '#f8faf8' }}
                            onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
                            <span className="text-sm font-body capitalize"
                              style={{ color: isSelected ? '#b87800' : a === 'All' ? '#145a2e' : '#374151' }}>
                              {a === 'All' ? 'All Ailments' : a}
                            </span>
                            <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                              style={{ background: isSelected ? 'rgba(255,215,0,0.2)' : 'rgba(34,160,80,0.08)', color: isSelected ? '#b87800' : '#22a050' }}>
                              {count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Popular ailment pills */}
              <div className="flex flex-wrap gap-2 flex-1">
                {popularAilments.map(tag => (
                  <button key={tag} onClick={() => { setAilment(tag); setPage(1); setShowAilmentDropdown(false) }}
                    className="tag-pill"
                    style={ailment === tag
                      ? { background: 'linear-gradient(135deg, #ffd700, #e6c300)', color: '#0a3d1f', borderColor: 'transparent', boxShadow: '0 3px 10px rgba(255,215,0,0.4)', fontWeight: 700 }
                      : { background: 'rgba(34,160,80,0.07)', color: '#145a2e', border: '1px solid rgba(34,160,80,0.18)' }
                    }>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {paginated.map((remedy, idx) => (
              <div key={remedy.id}
                className="fade-in-up"
                style={{ animationDelay: `${(idx % 8) * 0.05}s` }}>
                <RemedyCard remedy={remedy} />
              </div>
            ))}
          </div>
        ) : (
          <div className="wellness-card text-center py-16 sm:py-24 px-6">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(34,160,80,0.08))', border: '1px solid rgba(255,215,0,0.22)' }}>
              <BookOpen className="w-7 h-7" style={{ color: '#b87800' }} />
            </div>
            <p className="font-display text-lg sm:text-xl text-green-900 mb-2 font-bold">No remedies match those filters</p>
            <p className="font-body text-sm mb-6" style={{ color: '#7a8a7e' }}>Try widening your search, or clear filters to see everything.</p>
            <button onClick={clearAll} className="btn-gold text-sm">Clear all filters</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mt-12">
            <button onClick={() => { if (page > 1) { setPage(page - 1); window.scrollTo(0, 0) } }}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-body font-semibold transition-all hover:scale-105"
              style={{ background: page === 1 ? '#f2ede8' : 'white', color: page === 1 ? '#c8bfb6' : '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }}>
              ← Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => {
              let p: number
              if (totalPages <= 8) p = i + 1
              else if (page <= 4) p = i + 1
              else if (page >= totalPages - 3) p = totalPages - 7 + i
              else p = page - 3 + i
              return (
                <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0) }}
                  className="w-10 h-10 rounded-xl text-sm font-body font-semibold transition-all hover:scale-105"
                  style={p === page
                    ? { background: 'linear-gradient(135deg, #ffd700, #e6c300)', color: '#0a3d1f', boxShadow: '0 4px 12px rgba(255,215,0,0.35)' }
                    : { background: 'white', color: '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }
                  }>{p}</button>
              )
            })}
            <button onClick={() => { if (page < totalPages) { setPage(page + 1); window.scrollTo(0, 0) } }}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-body font-semibold transition-all hover:scale-105"
              style={{ background: page === totalPages ? '#f2ede8' : 'white', color: page === totalPages ? '#c8bfb6' : '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }}>
              Next →
            </button>
          </div>
        )}
      </div>

      {showAilmentDropdown && <div className="fixed inset-0 z-20" onClick={() => setShowAilmentDropdown(false)} />}
    </div>
  )
}
