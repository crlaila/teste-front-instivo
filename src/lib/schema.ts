import { z } from 'zod';
import { Estados } from './estados';

export const addressSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, { error: 'CEP inválido' }),
  logradouro: z
    .string()
    .min(1, { error: 'Obrigatório' })
    .max(220, { error: 'Máximo de 220 caracteres' }),
  complemento: z
    .string()
    .max(60, { error: 'Máximo de 60 caracteres' })
    .optional()
    .default(''),
  bairro: z
    .string()
    .min(1, { error: 'Obrigatório' })
    .max(80, { error: 'Máximo de 80 caracteres' }),
  cidade: z
    .string()
    .min(1, { error: 'Obrigatório' })
    .max(80, { error: 'Máximo de 80 caracteres' }),
  estado: z.enum(Estados, { error: 'UF inválida' }),
});

export type Address = z.infer<typeof addressSchema>;

export type CepRecord = Address & {
  id: string;
  createdAt: string;
};
