import Link from "next/link";
import Image from "next/image";
import artworks from "../../../content/seed/artworks.json";

type Art = {
  id:string; artistId:string; artistName?:string; images?:string[];
  slug:string; title:string; price:number; currency:string;
};

export default function ArtistDetail({ params }: { params: { id: string } }) {
  const all = artworks as Art[];

  const artistName = all.find(a => a.artistId === params.id)?.artistName
    ?? `Artist ${params.id.slice(-3)}`;

  const byThisArtist = all.filter(a => a.artistId === params.id);

  if (byThisArtist.length === 0) {
    return <div className="container mx-auto py-10">Artist not found.</div>;
  }

  const prices = byThisArtist.map(a => a.price).sort((a,b)=>a-b);
  const min = prices[0], max = prices[prices.length-1];

  return (
    <div className="container mx-auto py-10">
      <nav className="text-sm mb-6">
        <Link href="/" className="underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/artists" className="underline">Artists</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{artistName}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{artistName}</h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          Short bio placeholder for {artistName}. Add medium, location, shows, awards, etc.
        </p>
        <div className="mt-3 flex gap-6 text-sm text-gray-600">
          <span><strong>{byThisArtist.length}</strong> works</span>
          <span>Price range: <strong>{min}</strong>–<strong>{max}</strong> USD</span>
          <Link href="/contact" className="underline">Contact</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {byThisArtist.map(art => (
          <Link key={art.id} href={`/artworks/${art.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-sm">
            <div className="aspect-[4/3] relative bg-gray-100">
              {art.images?.[0] && (
                <Image src={art.images[0]} alt={art.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
              )}
            </div>
            <div className="p-4">
              <div className="font-medium">{art.title}</div>
              <div className="text-sm text-gray-600">{art.price} {art.currency}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
