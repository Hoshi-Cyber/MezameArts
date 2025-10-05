import Image from 'next/image';
import Link from 'next/link';

export function ArtistCard({ artist }: { artist: any }) {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <Image src={artist.avatarUrl || '/placeholder_light_gray_block.png'} alt={artist.name} width={200} height={200} className="rounded-full" />
      <h3 className="text-lg font-bold mt-2">{artist.name}</h3>
      <p className="text-sm text-gray-600">{artist.country}</p>
      <Link href={`/artists/${artist.slug}`} className="text-blue-600 underline">View profile</Link>
    </div>
  );
}
