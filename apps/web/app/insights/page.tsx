import Link from "next/link";

const posts = [
  { slug: "collecting-basics", title: "Collecting art: the basics", excerpt: "How to evaluate, budget, and buy with confidence." },
  { slug: "care-framing", title: "Caring & framing tips", excerpt: "Protecting works, framing choices, and display." },
  { slug: "artist-spotlight", title: "Artist spotlight: emerging voices", excerpt: "Three emerging artists to watch this season." },
];

export default function InsightsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(p => (
          <Link key={p.slug} href={`/insights/${p.slug}`} className="block border rounded-lg p-4 hover:shadow-sm">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
            <span className="text-blue-600 text-sm mt-3 inline-block">Read →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
