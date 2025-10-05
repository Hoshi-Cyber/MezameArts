import Link from "next/link";
import Image from "next/image";
import artworks from "../../content/seed/artworks.json";

type Art = { artistId: string; artistName?: string; images?: string[] };

function group() {
  const map = new Map<string, { id: string; name: string; cover?: string }>();
  (artworks as Art[]).forEach(a => {
    if (!map.has(a.artistId)) {
      map.set(a.artistId, { id: a.artistId, name: a.artistName ?? `Artist ${a.artistId.slice(-3)}`, cover: a.images?.[0] });
    }
  });
  return Array.from(map.values());
}

export default function ArtistsPage() {
  const artists = group();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artists.map(a => (
          <Link key={a.id} href={`/artists/${a.id}`} className="block border rounded-lg overflow-hidden hover:shadow-sm">
            <div className="aspect-[4/3] relative bg-gray-100">
              {a.cover && <Image src={a.cover} alt={a.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />}
            </div>
            <div className="p-4 font-medium">{a.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
