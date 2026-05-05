import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export function Button({
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'default' && 'bg-primary text-black hover:bg-primary/90',
        variant === 'outline' && 'border border-input bg-transparent hover:bg-accent',
        className,
      )}
      {...props}
    />
  );
}
