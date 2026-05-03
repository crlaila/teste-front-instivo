import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-6 border-b border-b-gray-200">
      <div className="container flex items-center gap-4 w-7xl mx-auto">
        <Image
          src="/logo.png"
          alt="Instivo Logo"
          width={50}
          height={50}
          loading="eager"
        />
        <div>
          <h1 className="text-2xl font-bold">Cadastro de endereços</h1>
          <p className="text-sm text-gray-600">
            Aplicação de teste para vaga front-end na Instivo
          </p>
        </div>
      </div>
    </header>
  );
}
