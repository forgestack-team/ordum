package br.com.ordum.config;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.MigrationInfo;
import org.springframework.boot.flyway.autoconfigure.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

    @Configuration
    public class FlywayStatusPrinter {

        private static final String GREEN = "\u001B[1;32m";
        private static final String RED = "\u001B[1;31m";
        private static final String RESET = "\u001B[0m";

        @Bean
        FlywayMigrationStrategy flywayMigrationStrategy() {
            return flyway -> {
                try {
                    flyway.migrate();
                    printStatus(flyway, null);
                } catch (RuntimeException e) {
                    printStatus(flyway, e);
                    throw e;
                }
            };
        }

        private void printStatus(Flyway flyway, RuntimeException error) {
            String color = (error == null) ? GREEN : RED;

            System.out.println();
            System.out.println(color + "==================== FLYWAY ====================" + RESET);

            try {
                for (MigrationInfo m : flyway.info().all()) {
                    boolean ok = m.getState().isApplied() && !m.getState().isFailed();
                    System.out.println((ok ? GREEN : RED) + String.format(
                            " v%-5s | %-25s | %-10s | %s",
                            m.getVersion(), m.getDescription(), m.getState(), m.getInstalledOn()
                    ) + RESET);
                }
            } catch (RuntimeException ignored) {
                System.out.println(RED + " Nao foi possivel listar as migrations." + RESET);
            }

            if (error != null) {
                System.out.println(RED + " ERRO: " + error.getMessage() + RESET);
            }

            System.out.println(color + "================================================" + RESET);
            System.out.println();
        }
    }
