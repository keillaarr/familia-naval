package com.familianaval.api.module.dependente.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dependentes")
public class Dependente {

    @Column(name = "nip_tit")
    private String nipTit;

    @Id
    @Column(name = "nip_dep")
    private String nipDep;

    @Column(name = "nome_dep")
    private String nomeDep;

    private String cpf;
    private String naturalidade;
    private Integer nacionalidade;
    private String parentesco;
    private String dependencia;

    @Column(name = "dt_nas_dep")
    private String dtNasDep;

    @Column(name = "sexo_dep")
    private Character sexoDep;

    @Column(name = "e_civ_dep")
    private Integer eCivDep;

    private String mae;
    private String pai;

    @Column(name = "dt_prim_concessao")
    private String dtPrimConcessao;

    private String concedido;
    private String motivoconcessao;
    private String motivosuspensao;

    @Column(name = "dt_ult_situacao")
    private String dtUltSituacao;

    @Column(name = "boletim_ult_situacao")
    private Integer boletimUltSituacao;

    private String filiacao;

    // Getters e Setters
    public String getNipTit() { return nipTit; }
    public void setNipTit(String nipTit) { this.nipTit = nipTit; }

    public String getNipDep() { return nipDep; }
    public void setNipDep(String nipDep) { this.nipDep = nipDep; }

    public String getNomeDep() { return nomeDep; }
    public void setNomeDep(String nomeDep) { this.nomeDep = nomeDep; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getParentesco() { return parentesco; }
    public void setParentesco(String parentesco) { this.parentesco = parentesco; }

    public String getDependencia() { return dependencia; }
    public void setDependencia(String dependencia) { this.dependencia = dependencia; }

    public String getConcedido() { return concedido; }
    public void setConcedido(String concedido) { this.concedido = concedido; }
}