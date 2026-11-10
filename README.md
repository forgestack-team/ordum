# Ordum

Aplicativo de finanças pessoais desenvolvido pelo grupo de estudo, com foco inicial em aprendizado e evolução incremental.

## Tecnologias definidas

- **Backend:** Java 21, Spring Boot 4.1.2 e Gradle (com Gradle Wrapper).
- **Frontend:** Angular 22 com componentes standalone.
- **Banco de Dados:** PostgreSQL 18 executado via Docker Compose.
- **Migrações:** Flyway integrado ao backend Spring Boot.
- **Automação:** Makefile para padronização dos comandos de ambiente local.
- Backend e frontend executados localmente durante o desenvolvimento.

## Estado do projeto

O projeto está na **Sprint 1 (Infraestrutura e Bootstrap)**. Parte da base técnica já foi entregue na branch `main` e o restante segue em construção:

- **Infraestrutura (`infra/`):** concluída — PostgreSQL 18 via Docker Compose, healthcheck e modelo `.env.example` ([guia de infraestrutura](infra/README.md)).
- **Backend (`backend/`):** bootstrap concluído — Java 21, Spring Boot 4.1.2, Gradle Wrapper (`./gradlew`), pacotes base, integração com `infra/.env`, dependências do Flyway e endpoint inicial `GET /api/v1/ping` ([guia do backend](backend/README.md)).
- **Frontend (`frontend/`):** em andamento na branch `feature/frontend` (bootstrap Angular 22, proxy e tela inicial de status da API, pendente de revisão e merge).
- **Migrações (Flyway):** pendente — `db/migration/` e `V1__baseline.sql` ainda não foram criados.
- **Automação (`Makefile`):** pendente — comandos unificados na raiz ainda não foram implementados.

As entidades, migrações e funcionalidades financeiras do MVP ainda não foram implementadas.

## Como executar atualmente

Enquanto o `Makefile` não é entregue, utilize os guias individuais:

1. Suba o PostgreSQL 18 seguindo [infra/README.md](infra/README.md).
2. Execute a API e os testes seguindo [backend/README.md](backend/README.md).

## Documentação

Comece pelo [índice da documentação](docs/README.md), que reúne escopo, regras, arquitetura, etapas de implementação e critérios de validação.
