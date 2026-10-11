package com.familianaval.api.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class SecurityUtils {

    public static String getCpfLogado() {
        // ENQUANTO ESTIVER EM HOMOLOGAÇÃO LOCAL SEM GOV.BR:
        // Retorna um CPF de teste fixo ou vindo de um header/mock
        boolean modoSimulacao = true; // mude para false quando ativar o OAuth2
        
        if (modoSimulacao) {
            return "43243479568"; // Seu CPF de teste atual
        }
        
        // QUANDO O GOV.BR ESTIVER ATIVO:
        // Pega do contexto real do Spring Security (OAuth2User)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof OAuth2User oauth2User) {
            return oauth2User.getAttribute("cpf");
        }
        
        return null;
    }
}