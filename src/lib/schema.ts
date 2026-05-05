import { z } from 'zod';
import { Estados } from './estados';
import { CEP_PATTERN } from './cep-utils';

export const addressSchema = z.object({
  cep: z.string().regex(CEP_PATTERN, { message: 'CEP inválido' }),
  logradouro: z
    .string()
    .min(1, { message: 'Obrigatório' })
    .max(220, { message: 'Máximo de 220 caracteres' }),
  numero: z
    .string()
    .max(20, { message: 'Máximo de 20 caracteres' })
    .optional()
    .default(''),
  complemento: z
    .string()
    .max(60, { message: 'Máximo de 60 caracteres' })
    .optional()
    .default(''),
  bairro: z
    .string()
    .min(1, { message: 'Obrigatório' })
    .max(80, { message: 'Máximo de 80 caracteres' }),
  cidade: z
    .string()
    .min(1, { message: 'Obrigatório' })
    .max(80, { message: 'Máximo de 80 caracteres' }),
  estado: z.enum([Estados[0], ...Estados.slice(1)], {
    message: 'Selecione um estado válido',
  }),
});

export type Address = z.infer<typeof addressSchema>;

export type CepRecord = Address & {
  id: string;
  createdAt: string;
};
