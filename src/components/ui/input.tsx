import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 border rounded-md bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-input focus:ring-primary',
        className,
      )}
      {...props}
    />
  );
}

export function InputError({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Input error {...props} className={className} />;
}
