"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartProvider";
import { formatPrice } from "../../utils/format";

const LAST_ORDER_KEY = "mezame-last-order:v1";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const displayCurrency = items[0]?.currency ?? "USD";

  // Empty-cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="border rounded-lg p-6">
          <p className="text-gray-700">Your cart is empty.</p>
          <Link href="/artworks" className="inline-block mt-4 underline">
            Browse artworks →
          </Link>
        </div>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // --- Demo: persist a simple receipt so the success page can show it ---
    const receipt = {
      id: `ORD-${Date.now()}`,
      ts: Date.now(),
      total,
      items: items.map(({ id, title, price, currency, qty, image }) => ({
        id,
        title,
        price,
        currency,
        qty,
        image,
      })),
    };
    try {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(receipt));
    } catch {
      // ignore storage errors in demo
    }

    // Clear cart and go to success page
    clear();
    router.push("/checkout/success");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order summary */}
        <aside className="lg:col-span-1 border rounded-lg p-4 h-fit">
          <h2 className="font-semibold mb-3">Order summary</h2>
          <ul className="divide-y">
            {items.map((it) => (
              <li key={it.id} className="py-3 flex items-center gap-3">
                <div className="relative w-20 h-[72px] shrink-0 bg-gray-100 rounded">
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="80px"
                      className="object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.title}</div>
                  <div className="text-xs text-gray-600">
                    {it.qty} × {formatPrice(it.price, it.currency)}
                  </div>
                </div>
                <div className="text-sm">
                  {formatPrice(it.qty * it.price, it.currency)}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(total, displayCurrency)}</span>
          </div>
        </aside>

        {/* Billing / shipping (demo) */}
        <section className="lg:col-span-2 border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Billing details</h2>

          <form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="First name" required />
            <input className="border rounded px-3 py-2" placeholder="Last name" required />
            <input
              className="border rounded px-3 py-2 md:col-span-2"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="border rounded px-3 py-2 md:col-span-2"
              placeholder="Address"
              required
            />
            <input className="border rounded px-3 py-2" placeholder="City" required />
            <input className="border rounded px-3 py-2" placeholder="Country" required />

            <div className="md:col-span-2 mt-4 flex items-center gap-3">
              <button type="submit" className="px-5 py-3 rounded-md bg-black text-white">
                Place order (demo)
              </button>
              <Link href="/cart" className="underline text-sm">
                Back to cart
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
