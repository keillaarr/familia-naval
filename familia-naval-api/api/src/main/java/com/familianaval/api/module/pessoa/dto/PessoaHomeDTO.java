package com.familianaval.api.module.pessoa.dto;   

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PessoaHomeDTO {
    private String primeiroNome;
    private String tratamento; // "Sr." ou "Sra."
    private String mensagemSaudacao; // Ex: "O Sr. está no SVPM!"

    // Dentro do teu PessoaHomeDTO.java
    private boolean jaDeclarouNoAnoVigente;
}