import { NextResponse } from 'next/server';

import { handleApiError } from '@/lib/api-utils';
import { readRecords, saveRecord } from '@/lib/db';
import { addressSchema } from '@/lib/schema';

const ERROR_MESSAGES = {
  READ_FAILURE: 'Failed to read records',
  INVALID_JSON: 'Invalid JSON in request body',
  INVALID_DATA: 'Invalid address data',
  SAVE_FAILURE: 'Failed to save record',
} as const;

export async function GET() {
  try {
    const records = await readRecords();
    return NextResponse.json(records);
  } catch (error: unknown) {
    return handleApiError(error, ERROR_MESSAGES.READ_FAILURE);
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_JSON },
      { status: 400 },
    );
  }

  const parsed = addressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_DATA, details: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const record = await saveRecord(parsed.data);
    return NextResponse.json(record, { status: 201 });
  } catch (error: unknown) {
    return handleApiError(error, ERROR_MESSAGES.SAVE_FAILURE);
  }
}
