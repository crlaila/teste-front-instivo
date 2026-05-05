# Instivo - Teste Front-end

Sistema de cadastro de endereços com validação automática via CEP.

## Objetivo

Gerenciar e organizar cadastros de endereços com preenchimento automático através da API ViaCEP, reduzindo erros e melhorando a experiência do usuário.

## Stack Tecnológico

| Tecnologia          | Razão                                              |
| ------------------- | -------------------------------------------------- |
| **Next.js 15**      | Full-stack com API routes nativas                  |
| **React 19**        | Components otimizados e Server Components          |
| **TypeScript**      | Type-safety e melhor DX                            |
| **Zod**             | Validação de schemas sincronizada frontend/backend |
| **React Hook Form** | Gerenciamento de formulários leve                  |
| **Tailwind CSS**    | Estilização rápida e consistente                   |

## Decisões Arquiteturais

- **Persistência**: Arquivo JSON
- **Validação**: Camadas duplas (Frontend + Backend)
- **API**: REST simples (GET/POST em `/api/cep-records`)
- **Mascaramento**: CEP automático no formato XXXXX-XXX

## Funcionalidades

- ✅ Cadastro com validação em tempo real
- ✅ Busca automática de CEP via ViaCEP
- ✅ Preenchimento automático de cidade/bairro/estado
- ✅ Fallback manual quando CEP não encontrado
- ✅ Histórico de endereços registrados

## Setup

```bash
npm install
npm run dev        # Desenvolvimento
npm run build      # Build
npm test          # Testes
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura

```
src/
├── app/api/cep-records/    → Endpoints GET/POST
├── components/             → Formulário, lista, cards
└── lib/                    → Schema, validação, storage
```

## 👨‍💻 Desenvolvimento

**Desenvolvido por**: Laila Silva  
**Stack**: Next.js 15 • React 19 • TypeScript • Tailwind CSS  
**Última atualização**: Maio 2026
