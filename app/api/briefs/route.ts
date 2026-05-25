import { NextResponse } from 'next/server';
import { addBrief, listBriefs } from '@/lib/briefs';

export async function GET() {
  const items = listBriefs();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artist, releaseTitle, audience, goal, result, status } = body;

    if (!artist || !releaseTitle || !audience || !goal || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const brief = addBrief({ artist, releaseTitle, audience, goal, result, status });

    return NextResponse.json(brief, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
