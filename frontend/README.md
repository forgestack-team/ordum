# Frontend do Ordum

Aplicação web do projeto Ordum, desenvolvida com Angular 22 com componentes standalone.

## Estado atual

- Bootstrap do Angular 22 com componentes standalone.
- Integração de proxy reverso (`proxy.conf.json`) redirecionando `/api` para `http://localhost:8080`.
- Tela de Dashboard com verificação de status da API (`/api/v1/ping`) com suporte a texto puro e timeout resiliente configurado.
- Suíte de testes unitários com Vitest configurada.
- Padronização de código com ESLint e Prettier.

## Pré-requisitos

- Node.js 22+ e npm 11+.
- Backend da API em execução na porta `8080` para comunicação completa (opcional para testes unitários ou build isolado).

## Execução local

### Via Makefile (quando o Makefile estiver integrado à branch)

```bash
make run-front
```

### Via npm (dentro da pasta `frontend/`)

```bash
cd frontend
npm install
npm start
```

## Executar os testes

### Via Makefile (a partir da raiz do repositório)

```bash
make test-front
```

### Via npm (dentro da pasta `frontend/`)

```bash
cd frontend
npm test
```

## Formatação e Linting

```bash
cd frontend
npm run lint          # Executa o ESLint
npm run format:check  # Verifica a formatação com o Prettier
npm run format        # Aplica a formatação com o Prettier
```

## Build de produção

```bash
cd frontend
npm run build
```

Os artefatos compilados serão gerados no diretório `dist/frontend`.
