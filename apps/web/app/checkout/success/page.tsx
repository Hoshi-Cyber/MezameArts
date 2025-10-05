"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../utils/format";

const LAST_ORDER_KEY = "mezame-last-order:v1";

type ReceiptItem = {
  id: string;
  title: string;
  qty: number;
  price: number;
  currency: string;
  image?: string;
};

type Receipt = {
  id: string;
  ts: number; // unix ms
  total: number;
  items: ReceiptItem[];
};

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Receipt | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw) as Receipt);
      else setOrder(null);
    } catch {
      setOrder(null);
    }
  }, []);

  const orderCurrency = order?.items?.[0]?.currency ?? "USD";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Thank you! 🎉</h1>
      <p className="text-gray-700 mb-6" aria-live="polite">
        {order
          ? "Your order has been placed successfully."
          : "Your order is complete. (No receipt found for this session.)"}
      </p>

      {order && (
        <div className="border rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
            <div>
              <span>Order ID: </span>
              <span className="font-mono">{order.id}</span>
            </div>
            <div>
              <span>Date: </span>
              <span>{new Date(order.ts).toLocaleString()}</span>
            </div>
          </div>

          <ul className="divide-y">
            {order.items.map((it) => (
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
              {formatPrice(order.total, orderCurrency)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Link href="/artworks" className="px-5 py-3 rounded-md bg-black text-white">
          Continue browsing
        </Link>
        <Link href="/" className="px-5 py-3 rounded-md border">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
