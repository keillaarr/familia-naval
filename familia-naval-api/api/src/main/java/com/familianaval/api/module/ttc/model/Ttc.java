package com.familianaval.api.module.ttc.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.familianaval.api.module.om.model.OrganizacaoMilitar;
// Importe a entidade AreaInteresse conforme o pacote onde você a criar:
// import com.familianaval.api.module.areainteresse.model.AreaInteresse;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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

    @Column(name = "\"outrasInformacoes\"")
    private String outrasInformacoes;

    @Column(name = "ativo", columnDefinition = "bit")
    private Integer ativo;

    @Column(name = "\"AceitouTermo\"", columnDefinition = "bit")
    private Integer aceitouTermo;

    @Column(name = "\"ComandosServir\"")
    private Integer comandosServir;

    @Column(name = "contratado", length = 1)
    private String contratado;

    // ID numérico para manter compatibilidade direta com queries e DTOs
    @Column(name = "om_pretendida_id")
    private Long omPretendidaId;

    // Relacionamento ManyToOne com a tabela organizacoes_militares (FK om_pretendida_id -> id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "om_pretendida_id", insertable = false, updatable = false)
    private OrganizacaoMilitar omPretendida;

    // Relacionamento ManyToMany com as Áreas de Interesse através da tabela associativa
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ttc_area_interesse",
        schema = "public",
        joinColumns = @JoinColumn(name = "ttc_id"),
        inverseJoinColumns = @JoinColumn(name = "area_interesse_id")
    )
    @Builder.Default
    private Set<AreaInteresse> areasInteresse = new HashSet<>();
}