# Dr. Gideon Afolabi Wellness

A premium natural wellness web application featuring:
- Symptom Checker with 500+ herbal remedies
- AI-powered Plant Identifier (PlantNet API)
- Wellness Health Tracker with visual gauges
- Global Herbal Encyclopedia
- About Dr. Gideon Afolabi

Built with Next.js 14, Tailwind CSS, TypeScript, and PlantNet API.

## Setup

1. Clone this repo
2. Run `npm install`
3. Add your PlantNet API key to `.env.local`:
   ```
   PLANTNET_API_KEY=your_key_here
   NEXT_PUBLIC_PLANTNET_API_KEY=your_key_here
   ```
4. Add `dr-gideon.jpg` to the `/public` folder
5. Run `npm run dev`
6. Open http://localhost:3000

## Deploy to Hostinger

1. Push to GitHub
2. In Hostinger: connect GitHub repo
3. Build command: `npm run build`
4. Output directory: `.next`
5. Node version: 18
6. Add environment variable: `NEXT_PUBLIC_PLANTNET_API_KEY`
