import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">Mezame Arts</Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/artworks">Artworks</Link>
          <Link href="/artists">Artists</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/account">Account</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
