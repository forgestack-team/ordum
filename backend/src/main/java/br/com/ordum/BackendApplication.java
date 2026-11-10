package br.com.ordum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Ativa a configuração automática e a descoberta dos componentes da aplicação.
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Inicializa o Spring e repassa os argumentos recebidos na execução.
		SpringApplication.run(BackendApplication.class, args);
	}

}
