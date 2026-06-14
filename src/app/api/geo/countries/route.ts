import { NextResponse } from 'next/server';

const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd';

// Cache at the module level for the lifetime of the serverless function instance
let cache: unknown[] | null = null;

export const revalidate = 86400; // 24 hours ISR cache

export async function GET() {
  try {
    if (cache) {
      return NextResponse.json(cache, {
        headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600' },
      });
    }

    const res = await fetch(REST_COUNTRIES_URL, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    cache = data;

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[geo/countries] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 502 });
  }
}
