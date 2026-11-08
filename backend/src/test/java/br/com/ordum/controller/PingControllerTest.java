package br.com.ordum.controller;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PingControllerTest {

    // Verifica o contrato de resposta usado na integração com o frontend.
    @Test
    void deveRetornarPongComStatusOk() throws Exception {
        // Simula chamadas HTTP ao controller sem subir um servidor ou acessar o banco.
        MockMvc cliente = MockMvcBuilders
                .standaloneSetup(new PingController())
                .build();

        // Envia um GET simulado e confere o status HTTP e o texto retornado.
        cliente.perform(get("/api/v1/ping"))
                .andExpect(status().isOk())
                .andExpect(content().string("pong"));
    }
}
