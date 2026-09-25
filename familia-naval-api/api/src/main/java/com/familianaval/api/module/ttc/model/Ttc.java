package com.familianaval.api.module.ttc.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ttc", schema = "public")
public class Ttc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "idpessoa", nullable = false)
    private Long idPessoa;

    @Column(name = "dataultimaatualizacao", nullable = false)
    private LocalDate dataUltimaAtualizacao;

    @Column(name = "outrasInformacoes")
    private String outrasInformacoes;

    @Column(name = "ativo")
    private String ativo;

    @Column(name = "ComandosServir")
    private Integer comandosServir;

    @Column(name = "AceitouTermo")
    private String aceitouTermo;

    @Column(name = "contratado", length = 1)
    private String contratado;
}