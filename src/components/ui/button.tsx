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
        'px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.02] transition-all ease-in-out',
        variant === 'default' && 'bg-primary text-black',
        variant === 'outline' && 'border border-input bg-transparent',
        className,
      )}
      {...props}
    />
  );
}
