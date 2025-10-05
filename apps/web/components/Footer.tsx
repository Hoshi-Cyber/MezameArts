export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Mezame Arts. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/legal">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
