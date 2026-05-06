import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const TREFLE_TOKEN = process.env.TREFLE_API_TOKEN

async function fetchTrefleData(scientificName: string) {
  if (!TREFLE_TOKEN) return null
  try {
    const r = await fetch(`https://trefle.io/api/v1/plants/search?q=${encodeURIComponent(scientificName)}&token=${TREFLE_TOKEN}`)
    if (!r.ok) return null
    const d = await r.json()
    const top = d?.data?.[0]
    if (!top) return null
    const r2 = await fetch(`https://trefle.io/api/v1/plants/${top.id}?token=${TREFLE_TOKEN}`)
    if (!r2.ok) return top
    const d2 = await r2.json()
    return d2?.data ?? top
  } catch { return null }
}

async function savePlant(plant: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/herbal_plants`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':`Bearer ${SUPABASE_KEY}`,'Prefer':'return=representation' },
      body: JSON.stringify(plant),
    })
    if (!r.ok) return null
    const rows = await r.json()
    return rows[0] ?? null
  } catch { return null }
}

function buildUses(t: Record<string,unknown>|null, name: string): string[] {
  if (!t) return ['Traditional herbal medicine uses vary by region','Consult a qualified herbalist for specific applications','Used in folk medicine across multiple cultures']
  const u: string[] = []
  if (t.edible) u.push('Edible — used as a food source in traditional diets')
  if (t.edible_part && Array.isArray(t.edible_part)) u.push(`Edible parts: ${(t.edible_part as string[]).join(', ')}`)
  if (t.medicinal) u.push('Recognised medicinal plant in traditional healing systems')
  if (t.vegetable) u.push('Used as a vegetable in herbal food preparations')
  if (t.toxicity && t.toxicity !== 'none') u.push(`Toxicity level noted: ${t.toxicity} — use with caution`)
  if (u.length === 0) { u.push(`${name} has documented traditional uses across multiple healing systems`); u.push('Properties under continued research by botanical science') }
  return u
}

function buildDesc(t: Record<string,unknown>|null, common: string, sci: string, family: string): string {
  if (!t) return `${common} (${sci}) is a plant${family ? ` from the ${family} family` : ''} with documented uses in traditional herbal medicine across multiple healing cultures worldwide.`
  const p: string[] = [`${common} (${sci}) is a ${t.growth_habit||'plant'}${family ? ` of the ${family} family` : ''}.`]
  if (t.native_status) p.push(`Native to ${t.native_status}.`)
  if (t.duration) p.push(`It is a ${Array.isArray(t.duration)?(t.duration as string[]).join('/'):(t.duration as string)} plant.`)
  p.push('It has been valued in traditional herbal practice for its natural properties.')
  return p.join(' ')
}

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData()
    const image = incoming.get('images') as File | null
    if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    // Step 1 — PlantNet
    const apiKey = process.env.PLANTNET_API_KEY || '2b10SIHzY0amWrvAaHJh1wTe'
    const params = new URLSearchParams({'api-key':apiKey,'include-related-images':'false','no-reject':'true','lang':'en'})
    const pForm = new FormData()
    pForm.append('images', image)
    pForm.append('organs', 'auto')
    const pRes = await fetch(`https://my-api.plantnet.org/v2/identify/all?${params}`, { method:'POST', body:pForm })
    const pData = await pRes.json()
    if (!pRes.ok) return NextResponse.json({ error: pData?.message || `PlantNet error ${pRes.status}` }, { status: pRes.status })
    const top = pData.results?.[0]
    if (!top) return NextResponse.json({ error: 'No plant identified. Try a clearer photo.' }, { status: 404 })

    const commonNames: string[] = top.species?.commonNames || []
    const commonName = commonNames[0] || top.species?.scientificNameWithoutAuthor || 'Unknown Plant'
    const scientificName = top.species?.scientificNameWithoutAuthor || ''
    const family = top.species?.family?.scientificNameWithoutAuthor || ''
    const confidence = Math.round((top.score || 0) * 100)
    const altNames = commonNames.slice(1, 5)
    const plantNetImg = top.images?.[0]?.url?.m || top.images?.[0]?.url?.o || ''

    // Step 2 — Trefle
    const trefle = scientificName ? await fetchTrefleData(scientificName) as Record<string,unknown>|null : null
    const trefleId = trefle?.id as number|null ?? null
    const growthHabit = (trefle?.growth_habit || '') as string
    const nativeStatus = (trefle?.native_status || '') as string
    const edible = trefle?.edible as boolean|null ?? null
    const imageUrl = (trefle?.image_url as string) || plantNetImg || ''
    const isToxic = trefle?.toxicity && trefle.toxicity !== 'none' && trefle.toxicity !== 'low'

    const medicinalUses = buildUses(trefle, commonName)
    const description = buildDesc(trefle, commonName, scientificName, family)
    const preparation = `${commonName} is best prepared under the guidance of a qualified herbalist. Common preparations include herbal teas, tinctures, poultices, and infused oils. Always start with a small amount to assess sensitivity.`
    const safety = isToxic
      ? `This plant has a recorded toxicity level. Do not consume without expert verification. Consult a qualified healthcare provider before use.`
      : `For educational purposes only. Always consult a qualified herbalist or healthcare provider before using any plant medicinally.`

    // Step 3 — Save to Supabase
    const saved = await savePlant({ common_name:commonName, scientific_name:scientificName, family, confidence, trefle_id:trefleId, medicinal_uses:medicinalUses, description, image_url:imageUrl, preparation, safety, growth_habit:growthHabit, native_regions:nativeStatus, edible:edible??undefined })

    return NextResponse.json({
      results: [{ score:top.score, species:top.species, images:top.images }],
      enriched: {
        id: saved?.id,
        common_name: commonName,
        scientific_name: scientificName,
        family,
        confidence,
        alt_names: altNames,
        description,
        medicinal_uses: medicinalUses,
        preparation,
        safety,
        is_toxic: isToxic,
        growth_habit: growthHabit,
        native_regions: nativeStatus,
        edible,
        image_url: imageUrl,
        trefle_id: trefleId,
        trefle_available: !!trefle,
        saved_to_db: !!saved,
      }
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error'
    console.error('[/api/identify]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
