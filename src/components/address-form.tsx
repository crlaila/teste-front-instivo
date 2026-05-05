'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { z } from 'zod';

import { type Address, addressSchema } from '@/lib/schema';
import { fetchCep } from '@/lib/viacep';
import { isCepValid } from '@/lib/cep-utils';
import { maskCep } from '@/lib/format-cep';
import { Estados } from '@/lib/estados';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectItem } from './ui/select';
import FieldError from './ui/field-error';

type AddressInput = z.input<typeof addressSchema>;

const EMPTY: AddressInput = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: 'AC',
};

export default function AddressForm() {
  const router = useRouter();
  const [cepLoading, setCepLoading] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);

  const form = useForm<AddressInput, undefined, Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: EMPTY,
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = form;

  const cepRegister = register('cep');

  const handleCepBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>): Promise<void> => {
      await cepRegister.onBlur(e);

      const masked = maskCep(e.target.value);
      if (!isCepValid(masked)) return;

      setCepLoading(true);
      try {
        const result = await fetchCep(masked);
        if (!result.ok) {
          const messages = {
            'not-found': 'CEP não encontrado. Preencha o endereço manualmente.',
            network: 'Falha ao consultar o CEP. Tente novamente.',
            invalid: 'CEP inválido',
          };
          toast.error(messages[result.reason]);

          if (result.reason === 'not-found') {
            setCepNotFound(true);
            setTimeout(() => setFocus('logradouro'), 0);
          }
          return;
        }

        setCepNotFound(false);
        const { logradouro, bairro, localidade, uf } = result.data;
        const fieldsToUpdate: Partial<AddressInput> = {
          logradouro,
          bairro,
          cidade: localidade,
        };

        const ufUpper = (uf ?? '').toUpperCase();
        if ((Estados as readonly string[]).includes(ufUpper)) {
          fieldsToUpdate.estado = ufUpper as AddressInput['estado'];
        }

        Object.entries(fieldsToUpdate).forEach(([key, value]) => {
          setValue(key as keyof AddressInput, value);
        });

        await trigger(['logradouro', 'bairro', 'cidade', 'estado']);
        setFocus('numero');
      } finally {
        setCepLoading(false);
      }
    },
    [cepRegister, setValue, trigger, setFocus],
  );

  const handleCepChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = maskCep(e.target.value);
      void cepRegister.onChange(e);
      setCepNotFound(false);
    },
    [cepRegister],
  );

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await fetch('/api/cep-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast.error('Não foi possível salvar o endereço.');
        return;
      }

      toast.success('Endereço salvo!');
      reset(EMPTY);
      router.refresh();
      setFocus('cep');
    } catch {
      toast.error('Erro de rede. Tente novamente.');
    }
  });

  function handleClear() {
    reset(EMPTY);
    setFocus('cep');
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-2xl rounded-lg border border-border bg-white p-8 shadow-xs"
      aria-label="Cadastro de endereço"
    >
      <div className="space-y-5">
        <div>
          <Label htmlFor="cep" className="text-sm font-semibold">
            CEP <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <Input
              id="cep"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="00000-000"
              maxLength={9}
              className="text-sm"
              error={!!errors.cep}
              {...cepRegister}
              onChange={handleCepChange}
              onBlur={handleCepBlur}
              disabled={cepLoading}
            />
            {cepLoading && (
              <span
                role="status"
                aria-live="polite"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary"
              >
                Buscando…
              </span>
            )}
          </div>
          <FieldError message={errors.cep?.message} />
        </div>

        {cepNotFound && (
          <div className="flex items-center gap-2 rounded-md bg-amber-50 p-3 text-sm text-amber-900 border border-amber-200">
            <span>⚠️</span>
            <span>
              CEP não encontrado. Preencha os campos abaixo manualmente.
            </span>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="logradouro" className="text-sm font-semibold">
              Logradouro <span className="text-red-500">*</span>
            </Label>
            <Input
              id="logradouro"
              autoComplete="address-line1"
              className={`mt-2 ${cepNotFound ? '' : 'bg-gray-50'}`}
              disabled={!cepNotFound}
              {...register('logradouro')}
            />
            <FieldError message={errors.logradouro?.message} />
          </div>
          <div className="w-28">
            <Label htmlFor="numero" className="text-sm font-semibold">
              Nº
            </Label>
            <Input
              id="numero"
              placeholder="123"
              inputMode="numeric"
              className="mt-2"
              error={!!errors.numero}
              {...register('numero')}
            />
            <FieldError message={errors.numero?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="complemento" className="text-sm font-semibold">
              Complemento
            </Label>
            <Input
              id="complemento"
              placeholder="Apto, bloco..."
              className="mt-2"
              error={!!errors.complemento}
              {...register('complemento')}
            />
            <FieldError message={errors.complemento?.message} />
          </div>

          <div>
            <Label htmlFor="bairro" className="text-sm font-semibold">
              Bairro <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bairro"
              autoComplete="address-level3"
              className={`mt-2 ${cepNotFound ? '' : 'bg-gray-50'}`}
              disabled={!cepNotFound}
              {...register('bairro')}
            />
            <FieldError message={errors.bairro?.message} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Label htmlFor="cidade" className="text-sm font-semibold">
              Cidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cidade"
              autoComplete="address-level2"
              className={`mt-2 ${cepNotFound ? '' : 'bg-gray-50'}`}
              disabled={!cepNotFound}
              {...register('cidade')}
            />
            <FieldError message={errors.cidade?.message} />
          </div>

          <div>
            <Label htmlFor="estado" className="text-sm font-semibold">
              Estado <span className="text-red-500">*</span>
            </Label>
            <Select
              id="estado"
              className={`mt-2 ${cepNotFound ? '' : 'bg-gray-50'}`}
              disabled={!cepNotFound}
              error={!!errors.estado}
              {...register('estado')}
            >
              {Estados.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </Select>
            <FieldError message={errors.estado?.message} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none"
        >
          LIMPAR
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || cepLoading}
          className="flex-1 sm:flex-none bg-primary text-black hover:bg-primary/90"
        >
          {isSubmitting ? 'SALVANDO…' : 'SALVAR'}
        </Button>
      </div>
    </form>
  );
}
