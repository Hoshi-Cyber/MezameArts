"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../components/CartProvider";
import { formatPrice } from "../../utils/format";

export default function CartPage() {
  const { items, total, remove, setQty, clear } = useCart();
  const displayCurrency = items[0]?.currency ?? "USD";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your cart</h1>

      {items.length === 0 ? (
        <div className="border rounded-lg p-6">
          <p className="text-gray-700">Your cart is empty.</p>
          <Link href="/artworks" className="inline-block mt-4 underline">
            Browse artworks →
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y border rounded-lg">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 p-4">
                {/* Image */}
                <div className="relative w-24 h-[72px] shrink-0 bg-gray-100 rounded">
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="96px"
                      className="object-cover rounded"
                    />
                  )}
                </div>

                {/* Title + unit price */}
                <div className="flex-1">
                  <div className="font-medium line-clamp-2">{it.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatPrice(it.price, it.currency)}
                  </div>
                  {/* Line total on small screens */}
                  <div className="mt-1 text-sm text-gray-700 sm:hidden">
                    {formatPrice(it.qty * it.price, it.currency)}
                  </div>
                </div>

                {/* Qty */}
                <label className="sr-only" htmlFor={`qty-${it.id}`}>
                  Quantity
                </label>
                <input
                  id={`qty-${it.id}`}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  value={it.qty}
                  onChange={(e) =>
                    setQty(it.id, Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 border rounded px-2 py-1 text-right"
                />

                {/* Line total (qty × price) on >= sm */}
                <div className="hidden sm:block w-28 text-right text-sm text-gray-700">
                  {formatPrice(it.qty * it.price, it.currency)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(it.id)}
                  className="underline text-sm"
                  aria-label={`Remove ${it.title} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
              <button onClick={clear} className="underline text-sm">
                Clear cart
              </button>
              <Link href="/artworks" className="underline text-sm">
                Continue shopping
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                Total: {formatPrice(total, displayCurrency)}
              </div>
              <Link
                href="/checkout"
                className="px-5 py-3 rounded-md bg-black text-white"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
