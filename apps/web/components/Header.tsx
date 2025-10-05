"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useEffect, useState } from "react";

export default function Header() {
  const { items } = useCart();
  const [ready, setReady] = useState(false);

  // Wait until client mounts (cart loads from localStorage) to avoid hydration mismatch
  useEffect(() => setReady(true), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">Mezame Arts</Link>
        <nav className="flex gap-6 text-sm items-center">
          <Link href="/artworks">Artworks</Link>
          <Link href="/artists">Artists</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/account">Account</Link>

          <Link href="/cart" className="relative inline-flex items-center">
            Cart
            {ready && count > 0 && (
              <span
                className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-2 text-xs font-semibold text-white"
                aria-label={`${count} items in cart`}
              >
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
