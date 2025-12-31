import { NextResponse } from 'next/server';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Bad url' }, { status: 400 });
  }

  if (!ALLOWED_PROTOCOLS.has(target.protocol)) {
    return NextResponse.json({ error: 'Bad protocol' }, { status: 400 });
  }

  const res = await fetch(target.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 });
  }

  const type = res.headers.get('content-type') || '';
  if (!type.startsWith('image/')) {
    return NextResponse.json({ error: 'Not an image' }, { status: 400 });
  }

  const bytes = await res.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: 'Too large' }, { status: 413 });
  }

  return new NextResponse(bytes, {
    headers: {
      'content-type': type,
      'cache-control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
