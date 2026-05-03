import { Card } from './ui/card';

const MOCK_ADDRESSES = [
  { id: '1', cep: '32310-010', address: 'Rua dos Bobos, 0 - São Paulo/SP' },
  { id: '2', cep: '32310-010', address: 'Rua dos Bobos, 0 - São Paulo/SP' },
  { id: '3', cep: '32310-010', address: 'Rua dos Bobos, 0 - São Paulo/SP' },
  { id: '4', cep: '32310-010', address: 'Rua dos Bobos, 0 - São Paulo/SP' },
  { id: '5', cep: '32310-010', address: 'Rua dos Bobos, 0 - São Paulo/SP' },
];

export default function RecordListAddress() {
  return (
    <Card className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Registros salvos</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_ADDRESSES.map((item) => (
          <li key={item.id} className="flex flex-col gap-2 border rounded-md p-3 sm:p-4 hover:shadow-md transition-shadow">
            <span className="inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-medium text-black w-fit">
              {item.cep}
            </span>
            <div className="flex items-start gap-2">
              <span className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {item.address}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
