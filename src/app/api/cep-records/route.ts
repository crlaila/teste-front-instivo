import { NextResponse } from 'next/server';

import { addressSchema } from '@/lib/schema';
import { appendRecord, readRecords } from '@/lib/storage';

export async function GET() {
  try {
    const records = await readRecords();
    return NextResponse.json(records);
  } catch (err) {
    console.error('[api/cep-records] GET failed', err);
    return NextResponse.json(
      { error: 'internal' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const parsed = addressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const record = await appendRecord(parsed.data);
    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('[api/cep-records] POST failed', err);
    return NextResponse.json(
      { error: 'internal' },
      { status: 500 },
    );
  }
}
