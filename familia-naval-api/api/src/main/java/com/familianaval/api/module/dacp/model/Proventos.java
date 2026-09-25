package com.familianaval.api.module.dacp.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "proventos", schema = "public")
public class Proventos {

    @Id
    @Column(name = "cpf", length = 11, nullable = false)
    private String cpf;

    @Column(name = "dthora")
    private LocalDate dthora;

    @Column(name = "situacao")
    private String situacao;

    @Column(name = "orgaopublico")
    private String orgaopublico;

    @Column(name = "remuneracao")
    private String remuneracao;

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public LocalDate getDthora() { return dthora; }
    public void setDthora(LocalDate dthora) { this.dthora = dthora; }

    public String getSituacao() { return situacao; }
    public void setSituacao(String situacao) { this.situacao = situacao; }

    public String getOrgaopublico() { return orgaopublico; }
    public void setOrgaopublico(String orgaopublico) { this.orgaopublico = orgaopublico; }

    public String getRemuneracao() { return remuneracao; }
    public void setRemuneracao(String remuneracao) { this.remuneracao = remuneracao; }
}