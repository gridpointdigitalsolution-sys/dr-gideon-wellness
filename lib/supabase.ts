// Supabase REST API helper — no npm package needed, uses fetch directly

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const headers = () => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
})

export type HerbalPlant = {
  id?: string
  created_at?: string
  common_name: string
  scientific_name: string
  family: string
  confidence: number
  trefle_id: number | null
  medicinal_uses: string[]
  description: string
  image_url: string
  preparation: string
  safety: string
  growth_habit?: string
  native_regions?: string
  edible?: boolean
}

export async function savePlant(plant: Omit<HerbalPlant, 'id' | 'created_at'>): Promise<HerbalPlant | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/herbal_plants`, {
      method: 'POST',
      headers: { ...headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(plant),
    })
    if (!res.ok) return null
    const rows = await res.json()
    return rows[0] ?? null
  } catch {
    return null
  }
}

export async function getPlantHistory(limit = 20): Promise<HerbalPlant[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/herbal_plants?order=created_at.desc&limit=${limit}`,
      { headers: headers() }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}
