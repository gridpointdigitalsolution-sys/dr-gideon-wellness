import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json([])
  try {
    const r = await fetch(
      `${url}/rest/v1/herbal_plants?order=created_at.desc&limit=20`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` } }
    )
    if (!r.ok) return NextResponse.json([])
    return NextResponse.json(await r.json())
  } catch {
    return NextResponse.json([])
  }
}
