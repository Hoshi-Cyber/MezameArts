export async function GET() {
  const urls = ['/', '/artworks', '/artists'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((u) => `<url><loc>${process.env.NEXT_PUBLIC_BASE_URL}${u}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
