import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';

export default function AddressForm() {
  return (
    <form
      className="rounded-xl border border-border bg-surface p-6 shadow-sm"
      aria-label="Cadastro de endereço"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Label htmlFor="cep">CEP</Label>
          <div className="relative mt-1">
            <Input id="cep" placeholder="00000-000" maxLength={9} type="text" />
          </div>
        </div>

        <div className="sm:col-span-4">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input id="logradouro" className="mt-1" type="text" />
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            placeholder="Apto, bloco, referência (opcional)"
            className="mt-1"
            type="text"
          />
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="bairro">Bairro</Label>
          <Input id="bairro" className="mt-1" type="text" />
        </div>

        <div className="sm:col-span-4">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" className="mt-1" type="text" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="estado">UF</Label>
          <Select id="estado">
            <option value="Teste">teste</option>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" size="lg">
          LIMPAR
        </Button>
        <Button type="submit" size="lg">
          SALVAR
        </Button>
      </div>
    </form>
  );
}
