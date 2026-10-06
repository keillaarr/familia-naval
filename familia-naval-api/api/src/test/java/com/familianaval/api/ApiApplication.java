package com.familianaval.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {
    "com.familianaval.api.module.proventos.repository",
    "com.familianaval.api.module.dacp.repository",
    "com.familianaval.api.module.cidade.repository",
    "com.familianaval.api.module.comunicados.repository",
    "com.familianaval.api.module.endereco.repository"
})
@EntityScan(basePackages = {
    "com.familianaval.api.module.proventos.model",
    "com.familianaval.api.module.dacp.model",
    "com.familianaval.api.module.cidade.model",
    "com.familianaval.api.module.comunicados.model",
    "com.familianaval.api.module.endereco.model"
})
public class ApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}