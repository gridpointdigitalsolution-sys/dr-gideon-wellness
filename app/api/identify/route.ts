import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // ensure full Node.js runtime (not Edge)

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData()
    const image = incoming.get('images') as File | null

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const apiKey = process.env.PLANTNET_API_KEY
      || process.env.NEXT_PUBLIC_PLANTNET_API_KEY
      || '2b10SIHzY0amWrvAaHJh1wTe'

    // Build params — these MUST be query string, not form body
    const params = new URLSearchParams({
      'api-key': apiKey,
      'include-related-images': 'false',
      'no-reject': 'true',   // return best guess even for low-confidence photos
      'lang': 'en',
    })

    // Forward the image as multipart to PlantNet — server has no CORS restriction
    const plantForm = new FormData()
    plantForm.append('images', image)
    plantForm.append('organs', 'auto') // auto-detect leaf/flower/fruit/bark

    const plantRes = await fetch(
      `https://my-api.plantnet.org/v2/identify/all?${params.toString()}`,
      { method: 'POST', body: plantForm }
    )

    const data = await plantRes.json()

    if (!plantRes.ok) {
      return NextResponse.json(
        { error: data?.message || `PlantNet error ${plantRes.status}` },
        { status: plantRes.status }
      )
    }

    return NextResponse.json(data)

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error'
    console.error('[/api/identify]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
