import englandData from '@/data/england.json';

const BASE_URL = 'https://smartwhip.co';

export async function GET() {
  const urls = englandData.map(t => {
    const slug = t.city.toLowerCase().replace(/\s+/g, '-');
    return `  <url>
    <loc>${BASE_URL}/towns/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
