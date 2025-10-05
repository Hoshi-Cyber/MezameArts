"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "../../utils/format";

const LAST_ORDER_KEY = "mezame-last-order:v1";
const ORDERS_KEY = "mezame-orders:v1";

type OrderItem = {
  id: string;
  title: string;
  qty: number;
  price: number;
  currency: string;
  image?: string;
};

type Order = {
  id: string;
  ts: number; // unix ms
  total: number;
  items: OrderItem[];
};

export default function AccountPage() {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      if (raw) setLastOrder(JSON.parse(raw) as Order);

      const rawOrders = localStorage.getItem(ORDERS_KEY);
      if (rawOrders) {
        setOrders(JSON.parse(rawOrders) as Order[]);
      } else if (raw) {
        setOrders([JSON.parse(raw) as Order]);
      }
    } catch {
      // ignore storage errors in demo
      setLastOrder(null);
      setOrders([]);
    }
  }, []);

  const currency = lastOrder?.items?.[0]?.currency ?? "USD";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      {/* Auth placeholder */}
      <section className="mb-8 border rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-gray-700">
            You’re browsing as a guest. In a real app you’d sign in, edit your profile, and manage orders here.
          </p>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 rounded-md border">
              Sign in
            </Link>
            <Link href="/register" className="px-4 py-2 rounded-md bg-black text-white">
              Create account
            </Link>
          </div>
        </div>
      </section>

      {/* Recent order */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Recent order</h2>

        {!lastOrder ? (
          <div className="border rounded-lg p-6">
            <p className="text-gray-700">No orders yet.</p>
            <div className="mt-3 flex gap-4">
              <Link href="/artworks" className="underline">Browse artworks</Link>
              <Link href="/cart" className="underline">View cart</Link>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
              <div>
                Order ID: <span className="font-mono">{lastOrder.id}</span>
              </div>
              <div>Date: {new Date(lastOrder.ts).toLocaleString()}</div>
            </div>

            <ul className="divide-y">
              {lastOrder.items.map((it) => (
                <li key={it.id} className="flex items-center gap-4 p-4">
                  <div className="relative w-16 h-12 shrink-0 bg-gray-100 rounded overflow-hidden">
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-600">
                      {it.qty} × {formatPrice(it.price, it.currency)}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {formatPrice(it.qty * it.price, it.currency)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-medium">Total</span>
              <span className="text-lg font-semibold">
                {formatPrice(lastOrder.total, currency)}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Order history (stub, shows one or many if saved) */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Order history</h2>
        {orders.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((o) => (
              <div key={o.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-mono">{o.id}</span>
                  <span>{new Date(o.ts).toLocaleDateString()}</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {o.items.slice(0, 3).map((it) => (
                    <li key={it.id} className="flex justify-between">
                      <span className="truncate">{it.title}</span>
                      <span>{formatPrice(it.qty * it.price, it.currency)}</span>
                    </li>
                  ))}
                  {o.items.length > 3 && (
                    <li className="text-gray-500">…and {o.items.length - 3} more</li>
                  )}
                </ul>
                <div className="mt-3 text-right font-medium">
                  {formatPrice(o.total, o.items[0]?.currency ?? "USD")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 text-gray-700">No previous orders yet.</div>
        )}
      </section>

      {/* Shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/artworks" className="border rounded-lg p-4 hover:shadow-sm">
          <h3 className="font-medium">Browse artworks</h3>
          <p className="text-sm text-gray-600 mt-1">
            Explore the latest pieces and discover new artists.
          </p>
        </Link>
        <Link href="/cart" className="border rounded-lg p-4 hover:shadow-sm">
          <h3 className="font-medium">Your cart</h3>
          <p className="text-sm text-gray-600 mt-1">
            Review items and proceed to checkout.
          </p>
        </Link>
        <Link href="/insights" className="border rounded-lg p-4 hover:shadow-sm">
          <h3 className="font-medium">Insights</h3>
          <p className="text-sm text-gray-600 mt-1">
            Tips for collecting, care, and artist spotlights.
          </p>
        </Link>
      </section>
    </div>
  );
}
