import type { CepRecord } from '@/lib/schema';

export interface RecordCardProps {
  record: CepRecord;
}

export default function RecordCard({ record }: RecordCardProps) {
  const addressLine = record.complemento
    ? `${record.logradouro} — ${record.complemento}`
    : record.logradouro;

  const formattedDate = new Date(record.createdAt).toLocaleString('pt-BR');

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-semibold">
          {record.cep}
        </span>
        <time
          dateTime={record.createdAt}
          className="text-xs text-muted-foreground"
        >
          {formattedDate}
        </time>
      </div>
      <p className="text-sm font-medium">{addressLine}</p>
      <p className="text-xs text-muted-foreground">
        {record.bairro} · {record.cidade}/{record.estado}
      </p>
    </article>
  );
}
