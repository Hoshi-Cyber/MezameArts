import Link from "next/link";
import Image from "next/image";
import artworks from "../../../content/seed/artworks.json";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";
import { formatPrice } from "../../../utils/format";

export default function ArtworkDetail({ params }: { params: { slug: string } }) {
  const art = (artworks as any[]).find((a) => a.slug === params.slug);
  if (!art) return notFound();

  return (
    <div className="container mx-auto py-10">
      <nav className="text-sm mb-6">
        <Link href="/" className="underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/artworks" className="underline">Artworks</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{art.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] border rounded-lg overflow-hidden">
          <Image
            src={art.images?.[0]}
            alt={art.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{art.title}</h1>
          <p className="text-gray-600 mb-4">{art.category}</p>
          <p className="text-xl font-semibold mb-6">
            {formatPrice(art.price, art.currency)}
          </p>
          <p className="mb-6">{art.description}</p>
          <div className="text-sm text-gray-600 space-y-1 mb-8">
            <div><strong>Dimensions:</strong> {art.dimensions}</div>
            <div><strong>Medium:</strong> {art.medium}</div>
            <div><strong>Tags:</strong> {(art.tags || []).join(", ")}</div>
          </div>

          <AddToCartButton art={art} />
        </div>
      </div>
    </div>
  );
}
