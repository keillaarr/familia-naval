package com.familianaval.api.module.ttc.dto;

import java.time.LocalDate;
import java.util.List;

public record TtcDadosUsuarioDTO(
    Long idTtc,
    String nip,
    String nome,
    String om,
    String vinculo,
    Character status,
    Character aceitouTermo,
    String outrasInformacoes,
    List<Integer> comando,
    Long idArea,
    LocalDate dataUltimaAtualizacao,
    List<Long> assuntos,
    Long omPretendidaId // <--- Adicione este campo no record
) {}