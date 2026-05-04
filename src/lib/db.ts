import type { Address, CepRecord } from './schema';

const records: CepRecord[] = [];

export async function readRecords(): Promise<CepRecord[]> {
  return Promise.resolve(records);
}

export async function saveRecord(address: Address): Promise<CepRecord> {
  const record: CepRecord = {
    ...address,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  records.push(record);
  return Promise.resolve(record);
}
