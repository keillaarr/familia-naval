package com.familianaval.api.module.om.model;

import java.time.LocalDateTime;

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
@Table(name = "organizacoes_militares", schema = "public")
public class OrganizacaoMilitar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sigla", length = 50)
    private String sigla;

    @Column(name = "nome", length = 255)
    private String nome;

    @Column(name = "tipo", length = 100)
    private String tipo;

    @Column(name = "om_superior_id")
    private Long omSuperiorId;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;
}