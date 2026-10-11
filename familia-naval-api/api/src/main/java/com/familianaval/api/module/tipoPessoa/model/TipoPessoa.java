package com.familianaval.api.module.tipoPessoa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"TipoPessoa\"")
public class TipoPessoa {

    @Id
    @Column(name = "\"idTipoPessoa\"")
    private Integer idTipoPessoa;

    @Column(name = "\"Descricao\"")
    private String descricao;

    public TipoPessoa() {
    }

    // Getters e Setters
    public Integer getIdTipoPessoa() {
        return idTipoPessoa;
    }

    public void setIdTipoPessoa(Integer idTipoPessoa) {
        this.idTipoPessoa = idTipoPessoa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}