import { NextResponse } from 'next/server';
import { addBrief, getBriefs } from '@/lib/briefs';

export async function GET() {
	return NextResponse.json(getBriefs());
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const brief = addBrief(body || {});
		return NextResponse.json(brief, { status: 201 });
	} catch (err) {
		return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
	}
}
