package com.familianaval.api.module.dacp.dto;

public record AcumulacaoCargosDTO(
    String cpf,
    String situacao,      // "naopercebo" ou "percebo"
    String orgaopagador,  // Nulo se naopercebo
    String remuneracao   // Nulo se naopercebo
) {}