import { isCepValid, extractDigits } from './cep-utils';

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type ViaCepReason = 'invalid' | 'not-found' | 'network';

export type ViaCepResult =
  | { ok: true; data: ViaCepResponse }
  | { ok: false; reason: ViaCepReason };

export async function fetchCep(rawCep: string): Promise<ViaCepResult> {
  if (!isCepValid(rawCep)) {
    return { ok: false, reason: 'invalid' };
  }

  const digits = extractDigits(rawCep);

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${digits}/json/`,
    );

    if (!response.ok) {
      return { ok: false, reason: 'network' };
    }

    const data = (await response.json()) as ViaCepResponse & { erro?: boolean };

    if (data.erro) {
      return { ok: false, reason: 'not-found' };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
