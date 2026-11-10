# Arquitetura e ambiente

## Estrutura do repositório

Um repositório único, independente do repositório de materiais do grupo:

```text
ordum/
├── docs/                # Documentação do projeto
├── infra/               # Docker Compose (PostgreSQL 18) e .env.example
├── backend/             # API Spring Boot 4.1.2 (Gradle Wrapper + Java 21)
├── frontend/            # SPA Angular 22 (em bootstrap na branch feature/frontend)
└── Makefile             # Automação na raiz (planejado)
```

Atualmente, `docs/`, `infra/` e a estrutura inicial de `backend/` (com endpoint `GET /api/v1/ping`) já estão presentes na `main`. As pastas `frontend/`, as migrações Flyway (`backend/src/main/resources/db/migration/`) e o `Makefile` estão em andamento ou pendentes na Sprint 1.

## Backend

Java 21, Spring Boot 4.1.2 e Gradle (com Gradle Wrapper `./gradlew`), utilizando Spring Web, Spring Data JPA, Bean Validation e Flyway. Organizar o código por funcionalidade, separando controllers, serviços, repositórios e DTOs. Não expor entidades JPA diretamente na API.

Entidades planejadas: Conta, Categoria, Lançamento, Recorrência e Transferência. Datas financeiras serão representadas sem horário. Operações financeiras que alterem múltiplos registros deverão ser transacionais.

As migrações Flyway definirão e evoluirão o esquema. O banco deverá aplicar chaves estrangeiras, precisão monetária e unicidade das ocorrências recorrentes.

## Frontend

Angular 22 com componentes standalone e formulários reativos. Telas de resumo, contas, categorias e lançamentos, com acesso aos fluxos de transferências e recorrências. Exibir erros de validação de forma compreensível e atualizar saldos após as operações.

## Automação e Orquestração

Makefile na raiz do projeto para padronização de comandos (`make up`, `make down`, `make run-back`, `make run-front`, `make test`, etc.), permitindo que qualquer desenvolvedor suba e gerencie o ambiente completo com facilidade.

## API REST planejada

Prefixo `/api` (o endpoint inicial de verificação já implementado utiliza `/api/v1/ping`). Os contratos detalhados de campos, respostas e códigos HTTP dos recursos de negócio ainda serão definidos na implementação.

| Recurso | Operações previstas |
|---|---|
| `/contas` | Listar, cadastrar e editar contas |
| `/categorias` | Listar, cadastrar e editar categorias |
| `/lancamentos` | Listar com filtros, cadastrar, editar, excluir, confirmar e desfazer confirmação |
| `/recorrencias` | Listar, criar e encerrar séries |
| `/transferencias` | Listar, criar e excluir com reversão dos efeitos |
| `/resumo` | Consultar saldo geral e por conta, atual e previsto |

Usar erros uniformes para validação e regras de negócio. O frontend não será a única camada de validação.

## Ambiente e versões

PostgreSQL 18 via Docker Compose; Java 21 e Angular 22 executados localmente. Incluir Gradle Wrapper, imagem do PostgreSQL 18 fixada, dependências fixadas, modelo de configuração e instruções de execução via Makefile.

Versões definidas: Java 21, Spring Boot 4.1.2, Gradle Wrapper, Angular 22 e PostgreSQL 18. Na base atual, o PostgreSQL 18 via Docker Compose (`infra/`) e o bootstrap do backend (`GET /api/v1/ping` e suíte inicial `./gradlew test`) já foram integrados; a validação ponta a ponta com Flyway, Angular 22 e Makefile ainda depende da conclusão das demais entregas da Sprint 1.

Credenciais locais ficarão fora do Git. O `.env.example` documentará as variáveis necessárias sem conter segredos reais. A integração entre frontend e API deverá ter configuração local documentada via proxy reverso.

## Uso inicial

Sem autenticação, o MVP terá um único contexto financeiro e será executado localmente com dados fictícios. Autenticação e isolamento por usuário precederão o uso compartilhado com dados reais.
