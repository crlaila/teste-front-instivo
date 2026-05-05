import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { Address, CepRecord } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");
const RECORDS_PATH = path.join(DATA_DIR, "records.json");
const TMP_PATH = `${RECORDS_PATH}.tmp`;

let dirEnsured = false;

async function ensureDataDirOnce(): Promise<void> {
  if (dirEnsured) return;
  await fs.mkdir(DATA_DIR, { recursive: true });
  dirEnsured = true;
}

export async function readRecords(): Promise<CepRecord[]> {
  try {
    const raw = await fs.readFile(RECORDS_PATH, "utf8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CepRecord[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    return [];
  }
}

export async function appendRecord(address: Address): Promise<CepRecord> {
  await ensureDataDirOnce();

  const record: CepRecord = {
    ...address,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const current = await readRecords();
  const next = [record, ...current];
  const json = `${JSON.stringify(next)}\n`;

  await fs.writeFile(TMP_PATH, json, "utf8");
  await fs.rename(TMP_PATH, RECORDS_PATH);

  return record;
}
