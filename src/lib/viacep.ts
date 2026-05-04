export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const ERROR_MESSAGES = {
  INVALID_CEP: 'CEP inválido',
  NOT_FOUND: 'CEP não encontrado',
  FETCH_ERROR: 'Erro ao buscar o CEP',
} as const;

type ApiResponse = {
  erro?: boolean;
} & ViaCepResponse;

export async function getCep(cep: string): Promise<ViaCepResponse> {
  const digits = cep.replace(/\D/g, '');

  if (digits.length !== 8) {
    throw new Error(ERROR_MESSAGES.INVALID_CEP);
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH_ERROR);
    }

    const data: ApiResponse = await response.json();

    if (data.erro) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : ERROR_MESSAGES.FETCH_ERROR,
    );
  }
}
