import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy SmartWhip UK — All Delivery Locations | Cream Chargers Near Me',
  description: 'Find cream charger delivery near you across 1,000+ UK towns and cities. SmartWhip, FastGas & Cream Deluxe 640g cylinders — same day delivery from £30. Order on WhatsApp.',
  alternates: {
    canonical: 'https://smartwhip.co/shop',
  },
  keywords: [
    'cream chargers near me',
    'SmartWhip delivery UK',
    'buy cream chargers UK',
    'same day cream charger delivery',
    'SmartWhip locations UK',
    'FastGas delivery UK',
    'cream charger delivery near me',
  ],
  openGraph: {
    title: 'SmartWhip UK — All Delivery Locations | From £30',
    description: 'Same day cream charger delivery across 1,000+ UK towns. SmartWhip, FastGas & Cream Deluxe 640g cylinders. Order now on WhatsApp.',
    images: ['/og_image/og_image.jpeg'],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
