"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/format";
import AddToCartButton from "./AddToCartButton";

export function ArtworkCard({ artwork }: { artwork: any }) {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <Link href={`/artworks/${artwork.slug}`} className="font-medium">
        {artwork.title}
      </Link>
      <p className="text-sm text-gray-500">{artwork.artistName}</p>

      <Image
        src={artwork.images?.[0] ?? "/placeholder.png"}
        alt={artwork.title}
        width={400}
        height={300}
        className="object-cover rounded"
      />

      <p className="mt-2 font-semibold">
        {formatPrice(artwork.price, artwork.currency)}
      </p>

      <AddToCartButton
        art={{
          id: artwork.id,
          slug: artwork.slug,
          title: artwork.title,
          price: artwork.price,
          currency: artwork.currency,
          images: artwork.images,
        }}
        className="mt-2 px-4 py-2 rounded-md bg-black text-white"
      />
    </div>
  );
}
