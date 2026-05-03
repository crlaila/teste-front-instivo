import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-b-gray-200 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 flex items-center gap-3 sm:gap-4">
        <Image
          src="/logo.png"
          alt="Instivo Logo"
          width={40}
          height={40}
          loading="eager"
          className="h-10 w-10 sm:h-12 sm:w-12"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold truncate">Cadastro de endereços</h1>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
            Aplicação de teste para vaga front-end na Instivo
          </p>
        </div>
      </div>
    </header>
  );
}
