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
                .requestMatchers("/usuario/logado").permitAll() // Libera a rota de testes
                .anyRequest().authenticated() // Exige autenticação para o restante
            );

        return http.build();
    }
}