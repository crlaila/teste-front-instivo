export const CEP_PATTERN = /^\d{5}-?\d{3}$/;
export const CEP_DIGIT_LENGTH = 8;

export function extractDigits(value: string): string {
  return (value ?? '').replace(/\D/g, '');
}

export function isCepValid(cep: string): boolean {
  const digits = extractDigits(cep);
  return digits.length === CEP_DIGIT_LENGTH;
}

export function formatCep(value: string): string {
  const digits = extractDigits(value).slice(0, CEP_DIGIT_LENGTH);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
