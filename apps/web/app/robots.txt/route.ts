export async function GET() {
  const body = `User-agent: *\nDisallow:`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
