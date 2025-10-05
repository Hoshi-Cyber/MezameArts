import { ArtworkCard } from '../../components/ArtworkCard';
import artworks from '../../content/seed/artworks.json';

export default function ArtworksPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Artworks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artworks.map((art: any) => (
          <ArtworkCard key={art.id} artwork={art} />
        ))}
      </div>
    </main>
  );
}
