# Backend do Ordum

API REST do projeto Ordum, desenvolvida com Java 21, Spring Boot 4.1.2 e Gradle Wrapper.

## Estado atual

- Estrutura inicial dos pacotes preparada.
- Endpoint `GET /api/v1/ping` implementado.
- Conexão com PostgreSQL configurada por variáveis externas.
- Leitura do arquivo local `infra/.env` configurada.
- Integração local com PostgreSQL e execução dos testes validadas em 06/11/2026.

As entidades e os endpoints de negócio ainda não foram implementados.
As migrations de negócio pertencem à tarefa de integração do Flyway e ainda não foram validadas nesta entrega.

## Pré-requisitos

- JDK 21.
- Docker Desktop instalado e em execução.
- Arquivos da infraestrutura disponíveis em `infra/`, ao lado de `backend/`.

Não é necessário instalar o Gradle separadamente: utilize o Wrapper incluído no projeto.

> A infraestrutura é uma entrega separada do time. Enquanto ela não estiver
> integrada à branch utilizada, os comandos abaixo dependem da disponibilização
> dos arquivos do PR de infraestrutura.

## Preparar o banco

Execute a partir da raiz do repositório, no Git Bash:

```bash
cd infra
cp .env.example .env
docker compose up -d
docker compose ps
```

Execute a cópia somente na primeira configuração. Se `.env` já existir, preserve os valores locais.

O serviço `database` deve apresentar o estado `healthy`.

## Configuração local

O arquivo `infra/.env` deve fornecer:

- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

Use o formato simples `CHAVE=valor`, sem `export` ou expressões de shell.
O arquivo é carregado pelo Spring como propriedades.

O backend procura o arquivo ao executar pela raiz do repositório ou pela pasta
`backend`. Também aceita valores fornecidos por variáveis de ambiente.

Não versione o arquivo `.env`. O `.env.example` contém apenas exemplos para
desenvolvimento local.

## Executar a API

A partir da raiz do repositório:

```bash
cd backend
./gradlew bootRun
```

A aplicação inicia na porta `8080` por padrão. O PostgreSQL precisa estar disponível.

Para encerrar a API, pressione `Ctrl + C` no terminal em que ela está rodando.

## Verificar a resposta da API

Abra:

```text
http://localhost:8080/api/v1/ping
```

Resposta esperada:

- Status HTTP: `200 OK`.
- Corpo: `pong`.

O ping verifica a resposta da API; não realiza uma consulta ao banco.

## Executar os testes

Dentro de `backend/`, com o PostgreSQL disponível:

```bash
./gradlew test
```

O teste de contexto carrega a aplicação completa e utiliza a configuração do banco.

Para executar apenas o teste isolado do ping, sem depender do PostgreSQL:

```bash
./gradlew test --tests "br.com.ordum.controller.PingControllerTest"
```

## Organização dos pacotes

Pacote base: `br.com.ordum`.

- `config`: configurações da aplicação e integrações.
- `controller`: endpoints HTTP.
- `domain`: entidades e conceitos do domínio financeiro.
- `dto`: dados de entrada e saída da API.
- `repository`: acesso aos dados persistidos.
- `service`: regras de negócio e coordenação das operações.

Os pacotes ainda sem implementação possuem documentação em `package-info.java`.

## Banco e migrations

O Flyway é responsável pela evolução do esquema do banco.

A configuração `ddl-auto: validate` faz o Hibernate conferir o esquema, sem criar
ou alterar tabelas. Ao adicionar entidades, as migrations correspondentes devem
estar disponíveis.

## Parar o banco

A partir da raiz do repositório:

```bash
cd infra
docker compose stop
```

Esse comando para o banco e preserva os dados locais.