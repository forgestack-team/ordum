.DEFAULT_GOAL := help

INFRA_DIR := infra
BACKEND_DIR := backend
FRONTEND_DIR := frontend
COMPOSE := docker compose --env-file $(INFRA_DIR)/.env -f $(INFRA_DIR)/compose.yaml

.PHONY: help env up down status logs run-back run-front test clean reset-db

help: ## Exibe esta lista de comandos.
	@awk 'BEGIN { FS = ":.*##"; printf "Uso: make <comando>\n\nComandos disponíveis:\n" } /^[a-zA-Z_-]+:.*##/ { printf "  %-12s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

env: ## Cria infra/.env a partir do modelo, se ainda não existir.
	@test -f $(INFRA_DIR)/.env || cp $(INFRA_DIR)/.env.example $(INFRA_DIR)/.env
	@echo "Configuração local disponível em $(INFRA_DIR)/.env."

up: env ## Inicia o PostgreSQL em segundo plano.
	@$(COMPOSE) up -d

down: ## Remove os containers, preservando os dados do banco.
	@$(COMPOSE) down

status: ## Mostra o estado dos containers da infraestrutura.
	@$(COMPOSE) ps

logs: ## Exibe e acompanha os logs do PostgreSQL.
	@$(COMPOSE) logs -f database

run-back: ## Inicia a API Spring Boot localmente na porta 8080.
	@cd $(BACKEND_DIR) && ./gradlew bootRun

run-front: ## Instala dependências e inicia o frontend Angular, quando integrado.
	@if [ ! -d $(FRONTEND_DIR) ]; then \
		echo "Frontend ainda não está presente nesta branch."; \
		exit 1; \
	fi
	@cd $(FRONTEND_DIR) && npm install && npm start

test: ## Executa a suíte de testes do backend.
	@cd $(BACKEND_DIR) && ./gradlew test

clean: ## Remove artefatos locais de build do backend e frontend.
	@cd $(BACKEND_DIR) && ./gradlew clean
	@if [ -d $(FRONTEND_DIR) ]; then cd $(FRONTEND_DIR) && npm run clean --if-present; fi

reset-db: ## Remove containers e volume do banco (apaga todos os dados locais).
	@$(COMPOSE) down -v
