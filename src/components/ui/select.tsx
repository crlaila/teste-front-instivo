'use client';

import { cn } from '@/lib/utils';

const CHEVRON_ICON = (
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 9l6 6m0 0l6-6"
    />
  </svg>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({
  children,
  className,
  error = false,
  ...props
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'w-full px-3 py-2 pr-10 border rounded-md bg-white text-foreground appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-input focus:ring-primary focus:border-primary',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {CHEVRON_ICON}
    </div>
  );
}

export function SelectTrigger({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <Select {...props}>{children}</Select>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <option value={value}>{children}</option>;
}

export function SelectValue() {
  return null;
}

export function SelectError({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <Select error {...props} className={className}>{children}</Select>;
}
