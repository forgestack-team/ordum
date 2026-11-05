# Backlog do Produto - Ordum (MVP)

Este documento organiza o backlog do MVP em épicos e histórias de usuário com critérios de aceite, pronto para ser importado para o GitHub Projects ou ferramenta de gestão ágil.

---

## Estrutura de Épicos

| ID | Épico | Objetivo |
|---|---|---|
| **EP01** | Infraestrutura e Bootstrap | Setup inicial do monorepo, Docker com PostgreSQL 18, backend Spring Boot com Gradle e Flyway, frontend Angular 22 e automação via Makefile. |
| **EP02** | Gestão de Contas e Categorias | CRUD de contas bancárias/carteiras e categorias financeiras (base para lançamentos). |
| **EP03** | Lançamentos Financeiros e Saldos | Registro de receitas e despesas, projeções, confirmação manual e saldo consolidado. |
| **EP04** | Transferências entre Contas | Movimentação entre contas cadastradas com garantia de atomicidade e reversão. |
| **EP05** | Recorrências Mensais | Agendamento e geração automática/manual de parcelas e lançamentos recorrentes. |
| **EP06** | Dashboard e Visão Consolidada | Telas de resumo geral, filtros por período/tipo/conta e refinamento de UX. |

---

## Detalhamento das Histórias e Tarefas

### Épico 01: Infraestrutura e Bootstrap (Foco da Sprint 1)

> **Meta da Sprint 1:** Criar o ambiente de desenvolvimento completo para que qualquer integrante do time consiga clonar o projeto e subir Front, Back e Banco localmente com comandos simples e padronizados.
>
> **Equipe (5 integrantes):** Bianca Salomão, Fabio, Lucas Yago, Marcelo Rodrigues e Matheus.

#### `TASK-01` • Setup do Ambiente Docker e Banco de Dados (PostgreSQL 18)
- **Responsável Sugerido:** Matheus
- **Descrição:** Criar o `compose.yaml` configurado com a imagem oficial do **PostgreSQL 18**, portas mapeadas (`5432`), volume para dados persistentes e arquivo `.env.example`.
- **Critérios de Aceite:**
  - `docker compose up -d` (ou comando equivalente no Makefile) sobe o banco de dados saudável.
  - Dados persistem entre reinicializações do container.
  - Documentação das variáveis de ambiente (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`) no `.env.example`.

#### `TASK-02` • Bootstrap do Backend (Java 21 + Spring Boot 4.1.2 + Gradle)
- **Responsável Sugerido:** Marcelo Rodrigues
- **Descrição:** Inicializar o diretório `backend/` utilizando **Gradle** (com Gradle Wrapper `./gradlew`), Java 21 e Spring Boot 4.1.2. Estruturar os pacotes base da aplicação seguindo boas práticas arquiteturais.
- **Dependências Base:** Spring Web, Spring Data JPA, PostgreSQL Driver, Flyway Migration, Bean Validation, Lombok.
- **Critérios de Aceite:**
  - Execução bem-sucedida via `./gradlew bootRun` e suite de testes passando (`./gradlew test`).
  - Configuração do `application.yml` conectando ao PostgreSQL via variáveis de ambiente.
  - Endpoint de healthcheck (`GET /api/v1/ping` ou Actuator) respondendo `200 OK`.
  - Estrutura base de pacotes configurada: `config`, `controller`, `domain`, `dto`, `repository`, `service`.

#### `TASK-03` • Bootstrap do Frontend (Angular 22)
- **Responsável Sugerido:** Bianca Salomão
- **Descrição:** Inicializar a pasta `frontend/` utilizando o **Angular 22** com Standalone Components, roteamento, formatação (`Prettier`), linter (`ESLint`) e estilos base.
- **Critérios de Aceite:**
  - Projeto executando sem erros localmente via `npm start` ou `ng serve` na porta 4200.
  - Configuração de proxy de desenvolvimento (`proxy.conf.json`) redirecionando `/api` para a porta 8080 do backend.
  - Estrutura base de diretórios estabelecida (`core/`, `shared/`, `features/`, `layouts/`).
  - Criação de uma página inicial de status consumindo o endpoint de teste da API.

#### `TASK-04` • Versionamento de Banco de Dados com Flyway
- **Responsável Sugerido:** Lucas Yago
- **Descrição:** Configurar o Flyway no backend Gradle para gerenciar e versionar o esquema do PostgreSQL 18. Criar a estrutura em `src/main/resources/db/migration/` e a migração inicial `V1__baseline.sql`.
- **Critérios de Aceite:**
  - Flyway executa automaticamente na inicialização da aplicação Spring Boot.
  - Criação da tabela de controle `flyway_schema_history` no PostgreSQL 18.
  - Migration inicial `V1__baseline.sql` cria as tabelas preliminares necessárias para o domínio financeiro.
  - Logs da aplicação confirmam a migração executada com sucesso.

#### `TASK-05` • Automação e Orquestração do Ambiente com Makefile
- **Responsável Sugerido:** Fabio
- **Descrição:** Criar o arquivo `Makefile` na raiz do repositório para centralizar e simplificar os comandos do ciclo de desenvolvimento para todos os membros da equipe.
- **Comandos Mínimos Esperados:**
  - `make help`: lista todos os comandos disponíveis com breve descrição.
  - `make up`: sobe os containers do Docker em background (`docker compose up -d`).
  - `make down`: encerra os containers e libera os recursos.
  - `make run-back`: executa o backend Spring Boot via Gradle Wrapper (`./gradlew bootRun`).
  - `make run-front`: instala dependências se necessário e inicia o servidor do Angular 22.
  - `make test`: executa os testes do backend (`./gradlew test`).
  - `make clean`: limpa builds locais e caches.
- **Critérios de Aceite:**
  - Todos os comandos testados e funcionais em ambiente Linux/macOS.
  - Desenvolvedor novo consegue clonar e rodar o projeto utilizando apenas comandos `make`.

---

### Matriz de Atribuição da Sprint 1

| Tarefa | Responsável | Stack Principal | Foco da Entrega |
|---|---|---|---|
| **TASK-01** | Matheus | Docker / PostgreSQL 18 | Infraestrutura de dados e variáveis de ambiente |
| **TASK-02** | Marcelo Rodrigues | Java 21 / Spring Boot / Gradle | Setup da API REST e estrutura de pacotes |
| **TASK-03** | Bianca Salomão | Angular 22 / TypeScript | Setup da SPA, proxy reverso e layout base |
| **TASK-04** | Lucas Yago | Flyway / SQL / Spring Data | Migrações automáticas e baseline do banco |
| **TASK-05** | Fabio | Makefile / Shell / Docker | Padronização dos scripts e orquestração do monorepo |

---

### Épico 02: Gestão de Contas e Categorias

#### `US-01` • CRUD de Contas Bancárias / Carteiras
- **Como** usuário,
- **Quero** cadastrar, editar e listar minhas contas (ex: Nubank, Carteira, Inter),
- **Para que** eu possa acompanhar onde meu dinheiro está guardado.
- **Critérios de Aceite:**
  - Saldo inicial padrão zero, permitindo customização na criação.
  - Não expor entidades JPA diretamente (usar DTOs).
  - Validação de campos obrigatórios (nome da conta não pode ser vazio).
  - Listagem com saldo atual de cada conta.

#### `US-02` • CRUD de Categorias
- **Como** usuário,
- **Quero** cadastrar categorias (ex: Alimentação, Transporte, Salário) com tipo (Receita ou Despesa),
- **Para que** eu possa organizar e filtrar meus gastos e ganhos.
- **Critérios de Aceite:**
  - Cadastro com nome e tipo (Receita/Despesa).
  - Listagem e edição simples no frontend.

---

### Épico 03: Lançamentos Financeiros e Saldos

#### `US-03` • Cadastro e Edição de Lançamentos (Receita / Despesa)
- **Como** usuário,
- **Quero** lançar receitas e despesas com descrição, valor, data prevista, conta e categoria,
- **Para que** eu tenha histórico e previsão financeira.
- **Critérios de Aceite:**
  - Valores monetários usando `BigDecimal` / `NUMERIC(19,2)`.
  - Datas sem componente de hora.
  - Status inicial: Pendente ou Confirmado.

#### `US-04` • Confirmação Manual de Lançamento e Reversão
- **Como** usuário,
- **Quero** marcar um lançamento como pago/recebido (ou desfazer a marcação),
- **Para que** meu saldo real reflita apenas o que já se concretizou.
- **Critérios de Aceite:**
  - Lançamento pendente não altera o saldo real/atual da conta.
  - Ao confirmar, o saldo atual da conta é recalculado.
  - Permitir desfazer a confirmação restaurando o saldo anterior.

#### `US-05` • Consulta de Saldo Atual e Previsto
- **Como** usuário,
- **Quero** visualizar o saldo atual consolidado e a projeção futura (saldo previsto),
- **Para que** eu saiba quanto tenho agora e quanto terei após as contas pendentes vencerem.
- **Critérios de Aceite:**
  - Saldo Atual: soma dos saldos iniciais + lançamentos confirmados.
  - Saldo Previsto: saldo atual + pendências até o horizonte de data selecionado (incluindo pendências atrasadas).

---

### Épico 04: Transferências entre Contas

#### `US-06` • Transferência de Valores entre Contas
- **Como** usuário,
- **Quero** transferir um valor de uma conta de origem para uma conta de destino,
- **Para que** eu mova meu saldo sem distorcer o total geral ou criar receitas/despesas falsas.
- **Critérios de Aceite:**
  - Operação atômica (`@Transactional`): debita na origem e credita no destino.
  - Saldo geral da aplicação permanece inalterado.
  - Exclusão da transferência reverte os saldos das duas contas.

---

### Épico 05: Recorrências Mensais

#### `US-07` • Criação de Séries Recorrentes
- **Como** usuário,
- **Quero** cadastrar despesas e receitas que se repetem mensalmente (fixas ou parceladas com N ocorrências),
- **Para que** eu não precise cadastrar manualmente todo mês.
- **Critérios de Aceite:**
  - Janela de geração de 12 meses para séries contínuas.
  - Ajuste inteligente para meses com menos dias (ex: dia 31 caindo em 28 de fevereiro).
  - Edição de uma ocorrência sem quebrar as ocorrências futuras.

---

### Épico 06: Dashboard, Filtros e Polimento

#### `US-08` • Filtros Avançados de Lançamentos
- **Como** usuário,
- **Quero** filtrar meus lançamentos por período (mês/ano), conta, categoria, tipo e situação (pago/pendente),
- **Para que** eu encontre rapidamente movimentações específicas.

#### `US-09` • Resumo Financeiro / Dashboard
- **Como** usuário,
- **Quero** uma tela inicial com cards de Saldo Atual, Saldo Previsto, Total a Pagar e Total a Receber no mês,
- **Para que** eu tenha uma visão imediata da minha saúde financeira.
