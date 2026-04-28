import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Dr. Gideon Afolabi Wellness | Natural Remedies & Herbal Solutions',
  description: 'Your trusted source for natural herbal remedies, plant identification, symptom-based wellness solutions, and holistic health guidance. Powered by Dr. Gideon Afolabi — Cornell-trained medicinal plant expert.',
  keywords: 'herbal remedies, natural wellness, plant identifier, symptom checker, Dr Gideon Afolabi, holistic health, medicinal plants, herbal encyclopedia, natural medicine, Herbal Wisdom Reviews',
  authors: [{ name: 'Dr. Gideon Afolabi' }],
  creator: 'Dr. Gideon Afolabi Wellness',
  publisher: 'Herbal Wisdom Reviews',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Dr. Gideon Afolabi Wellness | Natural Remedies & Herbal Solutions',
    description: 'Discover 500+ natural herbal remedies, identify plants with AI, track your wellness, and access a global herbal encyclopedia.',
    siteName: 'Dr. Gideon Afolabi Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Gideon Afolabi Wellness',
    description: 'Natural herbal remedies, plant identification and holistic wellness — powered by Dr. Gideon Afolabi.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a3d1f" />
        <link rel="canonical" href="https://drGideonAfolabi.com" />
        {/* Google AdSense: replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID after approval */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
