import Link from "next/link";

const content: Record<string,{title:string, body:string}> = {
  "collecting-basics": {
    title: "Collecting art: the basics",
    body: "How to evaluate condition, research the artist, and set a budget you’ll stick to."
  },
  "care-framing": {
    title: "Caring & framing tips",
    body: "UV glazing, acid-free materials, and handling to keep works in great shape."
  },
  "artist-spotlight": {
    title: "Artist spotlight: emerging voices",
    body: "A quick look at three emerging artists and why they’re gaining traction."
  },
};

export default function InsightPost({ params }: { params: { slug: string } }) {
  const post = content[params.slug];
  if (!post) return <div className="container mx-auto py-10">Post not found.</div>;

  return (
    <div className="container mx-auto py-10">
      <nav className="text-sm mb-6">
        <Link href="/" className="underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/insights" className="underline">Insights</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 max-w-2xl">{post.body}</p>
    </div>
  );
}
