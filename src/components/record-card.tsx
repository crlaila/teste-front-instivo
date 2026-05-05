import type { CepRecord } from '@/lib/schema';

export interface RecordCardProps {
  record: CepRecord;
}

export default function RecordCard({ record }: RecordCardProps) {
  const addressLine = record.complemento
    ? `${record.logradouro} — ${record.complemento}`
    : record.logradouro;

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-sm bg-primary px-2 py-1 text-xs font-semibold text-black">
          {record.cep}
        </span>
      </div>
      <p className="text-sm font-medium">{addressLine}</p>
      <p className="text-xs text-muted-foreground">
        {record.bairro} · {record.cidade}/{record.estado}
      </p>
    </article>
  );
}
