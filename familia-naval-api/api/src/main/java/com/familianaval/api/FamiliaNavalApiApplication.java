package com.familianaval.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.familianaval.api.module")
@EntityScan(basePackages = "com.familianaval.api.module")
public class FamiliaNavalApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(FamiliaNavalApiApplication.class, args);
    }
}