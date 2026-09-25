package com.familianaval.api.module.ttc.dto;

public record ItemOpcaoDTO(
    Long id,       // Identificador único (ex: ID do distrito ou da área)
    String nome    // Descrição/Nome para exibir no app
) {}