package com.familianaval.api.module.proventos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "proventos", schema = "public")
public class Proventos {

    @Id
    @Column(name = "cpf", length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(name = "dthora")
    private LocalDate dthora;

    @Column(name = "situacao")
    private String situacao;

    @Column(name = "orgaopublico")
    private String orgaopublico;

    @Column(name = "remuneracao")
    private String remuneracao;

    // Construtor padrão (obrigatório pelo JPA)
    public Proventos() {
    }

    // Construtor com argumentos
    public Proventos(String cpf, LocalDate dthora, String situacao, String orgaopublico, String remuneracao) {
        this.cpf = cpf;
        this.dthora = dthora;
        this.situacao = situacao;
        this.orgaopublico = orgaopublico;
        this.remuneracao = remuneracao;
    }

    // Getters e Setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDthora() {
        return dthora;
    }

    public void setDthora(LocalDate dthora) {
        this.dthora = dthora;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getOrgaopublico() {
        return orgaopublico;
    }

    public void setOrgaopublico(String orgaopublico) {
        this.orgaopublico = orgaopublico;
    }

    public String getRemuneracao() {
        return remuneracao;
    }

    public void setRemuneracao(String remuneracao) {
        this.remuneracao = remuneracao;
    }
}