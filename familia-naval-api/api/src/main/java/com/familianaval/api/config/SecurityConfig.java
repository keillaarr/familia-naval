package com.familianaval.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF para testes locais via Postman
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/usuario/logado",
                    "/api/v1/usuario/logado",
                    "/pessoa/**",
                    "/api/v1/pessoa/**",
                    "/endereco/**",
                    "/api/v1/endereco/**",
                    "/cidades/**",
                    "/api/v1/cidades/**",
                    "/auxinvalidez/**",
                    "/api/v1/auxinvalidez/**",
                    "/comunicados/**",
                    "/api/v1/comunicados/**",
                    "/dacp/**",
                    "/api/v1/dacp/**",
                    "/dependente/**",
                    "/api/v1/dependente/**",
                    "/inspsaude/**",         // <-- Corrigido para iniciar com /
                    "/api/v1/inspsaude/**",
                    "/tipoPessoa/**",        // <-- Corrigido para iniciar com /
                    "/api/v1/tipoPessoa/**",
                    "/vinculos/**",
                    "/api/v1/vinculos/**",
                    "/tcc/**",
                    "/api/v1/tcc/**"
                ).permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}