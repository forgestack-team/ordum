# Decisões e pendências

## Decisões confirmadas pelo grupo

- Projeto de finanças pessoais, começando por um MVP para aprendizado.
- **Backend:** Java 21 e Spring Boot 4.1.2 utilizando **Gradle** (com Gradle Wrapper).
- **Frontend:** **Angular 22** com componentes standalone.
- **Banco de Dados:** **PostgreSQL 18** executado via Docker Compose (`compose.yaml`).
- **Migrações de Banco:** Flyway gerenciado no backend.
- **Automação:** **Makefile** na raiz para padronização e orquestração dos comandos locais (`make up`, `make down`, `make run-back`, etc.).
- Banco no Docker; backend e frontend executados localmente.
- Repositório único próprio: `forgestack-team/ordum`, separado dos materiais do grupo.
- Equipe confirmada de 5 pessoas: Bianca Salomão, Fabio, Lucas Yago, Marcelo Rodrigues e Matheus.
- **Padrão de idioma:** Inglês para código-fonte (classes, métodos, atributos, endpoints futuros) e banco de dados (tabelas, colunas, constraints); Português para toda a documentação (`docs/`, `README.md`, comentários explicativos e gestão ágil).
- **Padronização de versão local:** Uso de `.nvmrc` (Node.js) e `.sdkmanrc` (Java 21) na raiz do repositório.
- **Estratégia de migrações (Flyway):** Manter a `V1__baseline.sql` com a tabela `users` (preparação estrutural para evolução pós-MVP) e evoluir o domínio financeiro por **migrações granulares** (`V2__create_accounts_table.sql`, `V3__create_categories_table.sql`, `V4__create_transactions_table.sql`, etc.).
- Receitas e despesas previstas, com confirmação manual.
- Saldo geral e separado por contas; transferências incluídas no MVP.
- Saldo inicial padrão zero, com possibilidade de alteração.
- Recorrência mensal contínua ou com quantidade definida de ocorrências.
- **Sprint 1:** encerrada em 11/11/2026. Os PRs [#9](https://github.com/forgestack-team/ordum/pull/9) (Flyway), [#10](https://github.com/forgestack-team/ordum/pull/10) (Frontend) e [#11](https://github.com/forgestack-team/ordum/pull/11) (Makefile) ficam como primeira atividade da Sprint 2, com os primeiros dias dedicados a revisão e merge até formar uma `main` estável.
- **Única tarefa atribuída no início da Sprint 2:** revisão do frontend (PR #10) pelo Marcelo, com os pontos registrados por escrito. As demais tarefas ficam em aberto até a planning.
- **Sprint 2:** 16/11/2026 a 25/11/2026; planning em 16/11 e review/retro em 25/11.
- **Estratégia de branches:** `main` mantém a versão estável; `dev` é a branch de integração das features; cada tarefa usa uma branch própria no padrão `<tipo>/S2-<numero>-<slug>` e entra por Pull Request.
- **Identidade visual:** roxo (`#6750D8`) como cor primária; verde para receitas e saldo positivo, vermelho para despesas e saldo negativo, interface clara com tons pastéis. Detalhes em [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
- Evolução posterior para usuários individuais, autenticação, privacidade e gestão financeira mais completa.

## Detalhes incorporados ao plano técnico aprovado

- BRL como moeda única; `BigDecimal` e `NUMERIC(19,2)` para valores.
- Flyway para migrações e DTOs na API.
- Datas financeiras sem horário.
- Projeção inclui pendências atrasadas até o horizonte escolhido.
- Recorrências contínuas com janela futura de doze meses, atualizada na inicialização e diariamente.
- Vencimentos ajustados ao último dia do mês, preservando o dia original da série.
- Edição individual de ocorrências; alterações gerais por encerramento e criação de nova série.
- Saldos negativos permitidos e transferências transacionais.

## Pendências para a implementação

- Definir contratos detalhados da API e estratégia de validação da alteração de referência da conta.
- Definir a estratégia de exclusão de uma ocorrência para impedir sua recriação automática.
- Definir o tratamento de datas efetivas futuras e o intervalo permitido para consultas de projeção.
- Definir limites operacionais para séries finitas e o tratamento de séries contínuas com início distante.
- Definir fuso do agendamento, concorrência da geração e precisão do horizonte de doze meses.
- Escolher a estrutura visual e bibliotecas de interface para o Angular 22 (Tailwind CSS, Angular Material ou Bootstrap), se necessárias.

## Estado e origem

Este registro consolida as decisões e o plano da conversa de preparação do projeto. Não comprova implementação. Código experimental criado fora deste repositório não foi incorporado ao Ordum.
