'use client'
import { useState, useMemo } from 'react'
import { Search, BookOpen, SlidersHorizontal, Tag, X } from 'lucide-react'
import remediesData from '@/data/remedies.json'
import RemedyCard from '@/components/RemedyCard'
import { Remedy } from '@/lib/matchRemedies'

const remedies = remediesData as Remedy[]
const categories = ['All', ...Array.from(new Set(remedies.map(r => r.category))).sort()]
const potencies = ['All', 'High', 'Medium', 'Low']

// Normalise potency — some entries store numeric scores instead of strings
function normalisePotency(p: unknown): string {
  if (typeof p === 'string') return p
  if (typeof p === 'number') {
    if (p >= 4.5) return 'High'
    if (p >= 4.2) return 'Medium'
    return 'Low'
  }
  return 'Low'
}

// Build sorted unique ailment list from all remedy symptoms
const allAilments: string[] = ['All', ...Array.from(
  new Set(remedies.flatMap(r => r.symptoms.map(s => s.toLowerCase().trim())))
).sort()]

export default function EncyclopediaPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [potency, setPotency] = useState('All')
  const [ailment, setAilment] = useState('All')
  const [ailmentSearch, setAilmentSearch] = useState('')
  const [showAilmentDropdown, setShowAilmentDropdown] = useState(false)
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
    setSearch('')
    setCategory('All')
    setPotency('All')
    setAilment('All')
    setAilmentSearch('')
    setPage(1)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f5f2ed 0%, #f8f6f2 60%, #f5f3ee 100%)' }}>
      {/* Hero */}
      <div className="bg-forest py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'rgba(255,215,0,0.8)' }} />
            <span className="text-xs font-body uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.8)' }}>Global Healing Database</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Herbal <span className="gold-text">Encyclopedia</span>
          </h1>
          <p className="font-body max-w-xl mx-auto" style={{ color: 'rgba(187,244,210,0.75)' }}>
            Browse our database of {remedies.length}+ natural remedies from healing traditions across the globe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Ailment Quick-Filter Banner */}
        {ailment !== 'All' && (
          <div className="mb-6 rounded-2xl px-5 py-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, rgba(10,61,31,0.95), rgba(5,46,15,0.95))', border: '1px solid rgba(255,215,0,0.25)' }}>
            <Tag className="w-4 h-4 flex-shrink-0" style={{ color: '#ffd700' }} />
            <p className="font-body text-sm flex-1" style={{ color: 'rgba(187,244,210,0.9)' }}>
              Showing all remedies that help with&nbsp;
              <span className="font-bold capitalize" style={{ color: '#ffd700' }}>{ailment}</span>
              &nbsp;— {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
            </p>
            <button onClick={() => { setAilment('All'); setPage(1) }}
              className="flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)' }}>
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ background: 'white', border: '1px solid rgba(255,215,0,0.2)', boxShadow: '0 4px 24px rgba(10,61,31,0.07)' }}>

          {/* Row 1: search + dropdowns */}
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <div className="flex-1 min-w-52 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: '#f9f7f4', border: '1px solid rgba(34,160,80,0.15)' }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#22a050' }} />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search remedies, symptoms, or tags..."
                className="flex-1 bg-transparent text-sm font-body outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-green-600" />
              <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}
                className="text-sm font-body rounded-xl px-3 py-3 outline-none cursor-pointer"
                style={{ background: '#f9f7f4', border: '1px solid rgba(34,160,80,0.15)', color: '#0a3d1f' }}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <select value={potency} onChange={e => { setPotency(e.target.value); setPage(1) }}
              className="text-sm font-body rounded-xl px-3 py-3 outline-none cursor-pointer"
              style={{ background: '#f9f7f4', border: '1px solid rgba(34,160,80,0.15)', color: '#0a3d1f' }}>
              {potencies.map(p => <option key={p}>{p} Potency</option>)}
            </select>
            <div className="ml-auto flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-body font-semibold"
                style={{ background: 'rgba(255,215,0,0.15)', color: '#b87800', border: '1px solid rgba(255,215,0,0.3)' }}>
                {filtered.length} results
              </span>
              {hasFilters && (
                <button onClick={clearAll}
                  className="text-xs font-body px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Ailment filter */}
          <div className="border-t pt-3" style={{ borderColor: 'rgba(34,160,80,0.1)' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <Tag className="w-3.5 h-3.5" style={{ color: '#22a050' }} />
              <span className="text-xs font-body font-semibold uppercase tracking-widest" style={{ color: '#145a2e' }}>
                Filter by Ailment
              </span>
              <span className="text-xs font-body" style={{ color: 'rgba(100,130,110,0.7)' }}>
                — pick a condition to see all remedies that treat it
              </span>
            </div>

            {/* Custom searchable ailment picker */}
            <div className="relative">
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: ailment !== 'All' ? 'rgba(255,215,0,0.08)' : '#f8f9f8',
                  border: ailment !== 'All' ? '1.5px solid rgba(255,215,0,0.4)' : '1px solid rgba(34,160,80,0.15)',
                  maxWidth: 340,
                }}
                onClick={() => setShowAilmentDropdown(v => !v)}
              >
                <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ailment !== 'All' ? '#b87800' : '#22a050' }} />
                <span className="text-sm font-body flex-1 capitalize"
                  style={{ color: ailment !== 'All' ? '#b87800' : '#6b7280' }}>
                  {ailment === 'All' ? 'All Ailments / Conditions' : ailment}
                </span>
                {ailment !== 'All' && (
                  <span className="text-xs font-body font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,215,0,0.2)', color: '#b87800' }}>
                    {filtered.length}
                  </span>
                )}
                <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94a3b8', transform: showAilmentDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showAilmentDropdown && (
                <div className="absolute left-0 top-full mt-1 z-30 rounded-2xl overflow-hidden"
                  style={{
                    width: 340,
                    background: 'white',
                    border: '1px solid rgba(34,160,80,0.2)',
                    boxShadow: '0 8px 32px rgba(10,61,31,0.15)',
                  }}>
                  {/* Search inside dropdown */}
                  <div className="p-2 border-b" style={{ borderColor: 'rgba(34,160,80,0.1)' }}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{ background: '#f9f7f4', border: '1px solid rgba(34,160,80,0.15)' }}>
                      <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22a050' }} />
                      <input
                        autoFocus
                        value={ailmentSearch}
                        onChange={e => setAilmentSearch(e.target.value)}
                        placeholder="Search ailments..."
                        className="flex-1 bg-transparent text-sm font-body outline-none text-gray-700 placeholder-gray-400"
                        onClick={e => e.stopPropagation()}
                      />
                      {ailmentSearch && (
                        <button onClick={e => { e.stopPropagation(); setAilmentSearch('') }}>
                          <X className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Ailment list */}
                  <div className="overflow-y-auto" style={{ maxHeight: 260 }}>
                    {filteredAilments.length === 0 ? (
                      <p className="text-center py-6 text-sm font-body text-gray-400">No ailments found</p>
                    ) : filteredAilments.map(a => {
                      const count = a === 'All'
                        ? remedies.length
                        : remedies.filter(r => r.symptoms.some(s => s.toLowerCase().trim() === a)).length
                      const isSelected = ailment === a
                      return (
                        <button
                          key={a}
                          onClick={() => { setAilment(a); setPage(1); setShowAilmentDropdown(false); setAilmentSearch('') }}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-all"
                          style={{
                            background: isSelected ? 'rgba(255,215,0,0.08)' : 'transparent',
                            borderBottom: '1px solid rgba(34,160,80,0.06)',
                          }}
                          onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = '#f8faf8' }}
                          onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                        >
                          <span className="text-sm font-body capitalize"
                            style={{ color: isSelected ? '#b87800' : a === 'All' ? '#145a2e' : '#374151' }}>
                            {a === 'All' ? 'All Ailments / Conditions' : a}
                          </span>
                          <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                            style={{
                              background: isSelected ? 'rgba(255,215,0,0.2)' : 'rgba(34,160,80,0.08)',
                              color: isSelected ? '#b87800' : '#22a050',
                            }}>
                            {count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Popular ailment chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['anxiety', 'inflammation', 'digestion', 'diabetes', 'insomnia', 'hypertension', 'immunity', 'arthritis', 'pain', 'liver', 'skin', 'stress'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setAilment(tag); setPage(1); setShowAilmentDropdown(false) }}
                  className="text-xs font-body px-3 py-1.5 rounded-full capitalize transition-all hover:scale-105"
                  style={ailment === tag
                    ? { background: 'linear-gradient(135deg, #ffd700, #e6c300)', color: '#0a3d1f', boxShadow: '0 2px 8px rgba(255,215,0,0.35)', fontWeight: 700 }
                    : { background: 'rgba(34,160,80,0.08)', color: '#145a2e', border: '1px solid rgba(34,160,80,0.15)' }
                  }>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginated.map(remedy => <RemedyCard key={remedy.id} remedy={remedy} />)}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(255,215,0,0.15)' }}>
            <BookOpen className="w-14 h-14 mx-auto mb-4" style={{ color: 'rgba(34,160,80,0.3)' }} />
            <p className="font-display text-xl text-gray-400 mb-4">No remedies found for your search.</p>
            <button onClick={clearAll} className="btn-gold text-sm">
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mt-12">
            <button onClick={() => { if (page > 1) { setPage(page - 1); window.scrollTo(0, 0) } }}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-body font-semibold transition-all"
              style={{ background: page === 1 ? '#f2ede8' : 'white', color: page === 1 ? '#c8bfb6' : '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }}>
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0) }}
                className="w-10 h-10 rounded-xl text-sm font-body font-semibold transition-all hover:scale-105"
                style={p === page
                  ? { background: 'linear-gradient(135deg, #ffd700, #e6c300)', color: '#0a3d1f', boxShadow: '0 4px 12px rgba(255,215,0,0.35)' }
                  : { background: 'white', color: '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }
                }>
                {p}
              </button>
            ))}
            <button onClick={() => { if (page < totalPages) { setPage(page + 1); window.scrollTo(0, 0) } }}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-body font-semibold transition-all"
              style={{ background: page === totalPages ? '#f2ede8' : 'white', color: page === totalPages ? '#c8bfb6' : '#145a2e', border: '1px solid rgba(34,160,80,0.2)' }}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Click-outside overlay to close ailment dropdown */}
      {showAilmentDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setShowAilmentDropdown(false)} />
      )}
    </div>
  )
}
