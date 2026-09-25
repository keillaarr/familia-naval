package com.familianaval.api.module.pessoa.dto;

public record RequisicaoDTO(
    String numero,
    String solicitacao,
    String data,
    String status
) {}