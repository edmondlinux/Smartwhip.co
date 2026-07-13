import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { BottomSheet } from '@/components/BottomSheet';
import { PostHogProvider } from '@/providers/PostHogProvider';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

const baseUrl = process.env.BASE_URL || 'https://smartwhip.co';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: 'Smart Whip UK | SmartWhip 640g Same Day Delivery | From £30',
  description: "Buy Smart Whip 640g cream chargers with same day delivery across the UK. SmartWhip, FastGas & Cream Deluxe — from £30. Order on WhatsApp or Telegram, 24/7.",
  keywords: [
    'smart whip',
    'smartwhip',
    'SmartWhip UK',
    'smart whip same day delivery',
    'cream chargers near me',
    'cream charger delivery UK',
    'SmartWhip 640g',
    'buy smartwhip',
    'smartwhip delivery',
    'FastGas UK',
    'Cream Deluxe UK',
    'nos delivery',
    'N2O cream chargers UK',
    'smartwhip wholesale',
  ],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Smart Whip UK | SmartWhip 640g Same Day Delivery | From £30',
    description: "Buy smart whip 640g cream chargers with same day delivery across the UK. SmartWhip, FastGas & Cream Deluxe — from £30. Order on WhatsApp or Telegram, 24/7.",
    type: 'website',
    url: baseUrl,
    images: [
      {
        url: '/og_image/og_image.jpeg',
        width: 1200,
        height: 630,
        alt: 'SmartWhip Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Whip UK | SmartWhip 640g Same Day Delivery | From £30',
    description: "Buy smart whip 640g cream chargers with same day delivery across the UK. SmartWhip, FastGas & Cream Deluxe — from £30. Order on WhatsApp or Telegram, 24/7.",
    images: ['/og_image/og_image.jpeg'],
  }
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="min-h-[100dvh]" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <PostHogProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SVEFLWNMY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SVEFLWNMY3');
          `}
        </Script>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
              "name": "Smartwhip UK",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo/logo.jpeg`,
                "width": 200,
                "height": 200
              },
              "description": "The UK's #1 supplier for Smartwhip, FastGas, Cream Deluxe and GoldWhip 640g N₂O cream charger cylinders. Fast UK-wide delivery.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+44-7476-690829",
                "email": "apexsmartwhips@gmail.com",
                "availableLanguage": "English"
              },
              "sameAs": []
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${baseUrl}/#website`,
              "name": "Smartwhip UK",
              "url": baseUrl,
              "description": "The UK's #1 supplier for SmartWhip, FastGas, Cream Deluxe and GoldWhip 640g N₂O cream charger cylinders.",
              "publisher": { "@id": `${baseUrl}/#organization` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <FloatingActionButtons />
        <BottomSheet />
        <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
