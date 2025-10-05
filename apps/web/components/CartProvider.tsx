"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "mezame-cart:v1";

// Basic runtime guard to avoid crashing on malformed storage
function isCartItemArray(v: unknown): v is CartItem[] {
  return Array.isArray(v) && v.every(i =>
    i &&
    typeof i === "object" &&
    typeof (i as any).id === "string" &&
    typeof (i as any).slug === "string" &&
    typeof (i as any).title === "string" &&
    typeof (i as any).price === "number" &&
    typeof (i as any).currency === "string" &&
    typeof (i as any).qty === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isCartItemArray(parsed)) {
          // Clamp qty to >= 1 just in case
          setItems(parsed.map(i => ({ ...i, qty: Math.max(1, Math.floor(i.qty || 1)) })));
        } else {
          // Corrupt payload — reset
          localStorage.removeItem(KEY);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // ignore write errors (quota, etc.)
    }
  }, [items]);

  // Keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : [];
          if (isCartItemArray(next)) {
            setItems(next.map(i => ({ ...i, qty: Math.max(1, Math.floor(i.qty || 1)) })));
          } else {
            setItems([]);
          }
        } catch {
          setItems([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Derived total
  const total = useMemo(
    () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [items]
  );

  const api = useMemo<CartCtx>(() => {
    return {
      items,
      add: (i, q = 1) => {
        const qty = Math.max(1, Math.floor(q));
        setItems(cur => {
          const idx = cur.findIndex(x => x.id === i.id);
          if (idx >= 0) {
            const copy = [...cur];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
            return copy;
          }
          return [...cur, { ...i, qty }];
        });
      },
      remove: (id) => setItems(cur => cur.filter(x => x.id !== id)),
      clear: () => setItems([]),
      setQty: (id, q) => {
        const qty = Math.max(1, Math.floor(q));
        setItems(cur => cur.map(x => (x.id === id ? { ...x, qty } : x)));
      },
      total,
    };
  }, [items, total]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useCart = (): CartCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};
