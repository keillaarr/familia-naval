package com.familianaval.api.module.ttc.dto;

import java.time.LocalDate;
import java.util.List;

public record TtcDadosUsuarioDTO(
    Long idTtc,                     // ID do registro no TTC
    String nip,                     // NIP descriptografado
    String nome,                    // Primeiro nome tratado (ex: "GUILHERME")
    String posto,                   // Sigla do Posto/Graduação (ex: "Cap")
    String vinculo,                 // Descrição do tipo de vínculo
    Character status,               // Status do cadastro ('1' para ativo, '0' para inativo)
    Character aceitouTermo,         // '1' se aceitou os termos de divulgação
    String outrasInformacoes,       // Observações/Informações complementares
    List<Integer> comando,          // Array dos distritos calculados a partir do bitmask
    Long idArea,                    // ID da área de atuação
    LocalDate dtUltimaAtualizacao,  // Data da última alteração no cadastro
    List<Long> assuntosUsuario      // Lista com os IDs dos assuntos selecionados
) {}