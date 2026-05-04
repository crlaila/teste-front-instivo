import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown, fallbackMessage: string) {
  const message =
    error instanceof Error ? error.message : fallbackMessage;
  const status =
    error instanceof ApiError ? error.status : 500;

  console.error(`[API Error] ${message}`, error);

  return NextResponse.json(
    { error: message },
    { status }
  );
}
