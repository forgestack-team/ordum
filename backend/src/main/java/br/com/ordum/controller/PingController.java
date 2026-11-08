package br.com.ordum.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Disponibiliza uma verificação simples de resposta da API.
 * Este endpoint não verifica a conexão com o banco de dados.
 */
// Envia o retorno dos métodos diretamente no corpo da resposta HTTP.
@RestController

// Define o prefixo comum das rotas deste controller.
@RequestMapping("/api/v1")
public class PingController {

    // Atende requisições GET em /api/v1/ping.
    @GetMapping("/ping")
    public String verificarDisponibilidade() {

        // Confirma que a API respondeu, sem consultar serviços ou o banco.
        return "pong";
    }
}
