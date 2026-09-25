package com.familianaval.api.module.pessoa.dto;

public record AuxilioInvalidezDTO(
    String ultimaDeclaracao,
    String proximaDeclaracao,
    String situacao,
    String mensagemSituacao,
    boolean podeEnviarNovaDeclaracao
) {}