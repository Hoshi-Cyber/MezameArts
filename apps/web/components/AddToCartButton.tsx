"use client";
import { useCart } from "./CartProvider";
import { useState } from "react";

export default function AddToCartButton(props: {
  art: {
    id: string;
    slug: string;
    title: string;
    price: number;
    currency: string;
    images?: string[];
  };
  className?: string;
}) {
  const { add, setQty, items } = useCart();
  const [added, setAdded] = useState(false);

  const onClick = () => {
    const existing = items.find((i) => i.id === props.art.id);

    if (existing) {
      // Ensure exactly 1 in the cart if it already exists
      setQty(existing.id, 1);
    } else {
      // Add new item with qty = 1
      add(
        {
          id: props.art.id,
          slug: props.art.slug,
          title: props.art.title,
          price: props.art.price,
          currency: props.art.currency,
          image: props.art.images?.[0],
        },
        1
      );
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={onClick}
      className={props.className ?? "px-5 py-3 rounded-md bg-black text-white"}
      aria-live="polite"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
