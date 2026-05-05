import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Address, CepRecord } from '@/lib/schema';

vi.mock('@/lib/storage', () => ({
  appendRecord: vi.fn(),
  readRecords: vi.fn(),
}));

import { POST } from '@/app/api/cep-records/route';
import { appendRecord } from '@/lib/storage';

const mockedAppend = vi.mocked(appendRecord);

const validPayload: Address = {
  cep: '01310-100',
  logradouro: 'Avenida Paulista',
  numero: '1000',
  complemento: 'Apto 101',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  estado: 'SP',
};

function buildRequest(body: unknown): Request {
  return new Request('http://localhost:3000/api/cep-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/cep-records', () => {
  beforeEach(() => {
    mockedAppend.mockReset();
  });

  afterEach(() => {
    mockedAppend.mockReset();
  });

  it('persists a valid address and returns 201 with the new record', async () => {
    const stored: CepRecord = {
      ...validPayload,
      id: '11111111-1111-4111-8111-111111111111',
      createdAt: '2026-05-04T10:00:00.000Z',
    };
    mockedAppend.mockResolvedValueOnce(stored);

    const res = await POST(buildRequest(validPayload));
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(stored);
    expect(mockedAppend).toHaveBeenCalledWith(validPayload);
  });

  it('returns 400 with validation issues when the payload is invalid', async () => {
    const res = await POST(buildRequest({ ...validPayload, cep: 'not-a-cep' }));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('validation');
    expect(data.issues.fieldErrors.cep?.[0]).toBe('CEP inválido');
    expect(mockedAppend).not.toHaveBeenCalled();
  });

  it('returns 400 when a required field is missing', async () => {
    const withoutLogradouro = {
      cep: validPayload.cep,
      complemento: validPayload.complemento,
      bairro: validPayload.bairro,
      cidade: validPayload.cidade,
      estado: validPayload.estado,
    };

    const res = await POST(buildRequest(withoutLogradouro));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('validation');
    expect(data.issues.fieldErrors.logradouro).toBeDefined();
    expect(mockedAppend).not.toHaveBeenCalled();
  });
});
