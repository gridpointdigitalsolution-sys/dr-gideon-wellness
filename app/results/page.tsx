import Link from 'next/link'

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-green-900 mb-4">Results</h1>
        <p className="text-gray-500 font-body mb-6">Use the Symptom Checker to get your results.</p>
        <Link href="/checker" className="btn-gold">Go to Symptom Checker</Link>
      </div>
    </div>
  )
}
