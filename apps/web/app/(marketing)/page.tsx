import Link from "next/link";
import Image from "next/image";
import artworks from "../../content/seed/artworks.json";

export default function MarketingHome() {
  const featured = (artworks as any[]).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="container mx-auto py-16">
        <h1 className="text-5xl font-bold tracking-tight">Collect remarkable art.</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Curated works from global artists. Transparent pricing. Instant checkout.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/artworks" className="px-5 py-3 rounded-md bg-black text-white">Browse artworks</Link>
          <Link href="/artists" className="px-5 py-3 rounded-md border">Meet artists</Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto pb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured this week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((art) => (
            <Link key={art.id} href={`/artworks/${art.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-sm">
              <div className="aspect-[4/3] relative">
                <Image
                  src={art.images?.[0]}
                  alt={art.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="font-medium">{art.title}</div>
                <div className="text-sm text-gray-600">{art.price} {art.currency}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/artworks" className="text-blue-600 underline">Explore all artworks →</Link>
        </div>
      </section>
    </>
  );
}
