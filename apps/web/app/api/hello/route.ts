export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello from web API' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
