package com.familianaval.api.module.ttc.dto;

import java.util.List;

public record SalvarTtcRequestDTO(
    Long idPessoa,               // ID da pessoa logada
    Integer comandoServir,       // Valor numérico da soma dos distritos (bitmask)
    String infoComplementar,     // Texto com as informações adicionais
    List<Long> idAssuntos        // Lista dos IDs de assuntos marcados no checkbox
) {}