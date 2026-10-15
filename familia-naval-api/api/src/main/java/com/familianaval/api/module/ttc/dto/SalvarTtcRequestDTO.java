package com.familianaval.api.module.ttc.dto;

import java.util.List;

public record SalvarTtcRequestDTO(
    Long idPessoa,
    List<Integer> comandoServir, // Alterado de Integer para List<Integer>
    String infoComplementar,
    List<Long> assuntos,         
    Long omPretendidaId
) {}