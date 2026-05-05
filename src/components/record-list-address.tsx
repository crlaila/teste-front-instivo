import type { CepRecord } from '@/lib/schema';
import RecordCard from './record-card';

export interface RecordListAddressProps {
  records: CepRecord[];
}

export default function RecordListAddress({ records }: RecordListAddressProps) {
  return (
    <section
      aria-labelledby="records-list-heading"
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
    >
      <header className="flex items-center justify-between gap-3">
        <h2
          id="records-list-heading"
          className="text-base font-semibold"
        >
          Registros salvos
        </h2>
        <span className="inline-flex min-w-6 items-center justify-center rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {records.length}
        </span>
      </header>

      {records.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum endereço salvo ainda.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {records.map((record) => (
            <li key={record.id}>
              <RecordCard record={record} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
