# Infraestrutura Local - Ordum (PostgreSQL 18)

Este diretório contém as configurações para execução do banco de dados relacional **PostgreSQL 18** em ambiente de desenvolvimento local via **Docker Compose**.

---

## 📋 Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

---

## 🚀 Como Iniciar o Banco de Dados

### 1. Configurar variáveis de ambiente
Copie o modelo de variáveis de ambiente:
```bash
cp .env.example .env
```

### 2. Subir o serviço
```bash
docker compose up -d
```

### 3. Verificar status do serviço
```bash
docker compose ps
```
O container `ordum-postgres` deve apresentar status `Up (healthy)`.

### 4. Parar o serviço
```bash
docker compose down
```
> Para parar e **apagar o volume de dados** (reset do banco): `docker compose down -v`.

---

## ⚙️ Variáveis de Ambiente e Integração com o Backend

As variáveis definidas no `.env` alimentam o container do Docker e devem ser espelhadas no backend Spring Boot:

| Variável | Padrão | Descrição | Uso no Spring Boot |
| :--- | :--- | :--- | :--- |
| `POSTGRES_HOST` | `localhost` | Endereço do host do banco | JDBC URL Host |
| `POSTGRES_PORT` | `5432` | Porta mapeada na máquina host | JDBC URL Port |
| `POSTGRES_DB` | `ordum_db` | Nome do banco de dados | JDBC Database |
| `POSTGRES_USER` | `ordum_user` | Usuário administrador | Datasource username |
| `POSTGRES_PASSWORD`| `password` | Senha de acesso | Datasource password |

---

## 🛠️ Comandos Úteis

### Conectar via CLI do PostgreSQL (`psql`):
```bash
docker compose exec database psql -U ordum_user -d ordum_db
```

### Checar logs do banco:
```bash
docker compose logs -f database
```
