package com.familianaval.api.module.vinculo.model;

import com.familianaval.api.module.tipoPessoa.model.TipoPessoa;
import jakarta.persistence.*;

@Entity
@Table(name = "\"Vinculo\"")
public class Vinculo {

    @Id
    @Column(name = "\"idVinculo\"")
    private String idVinculo;

    @Column(name = "\"idPessoa\"")
    private String idPessoa;

    @Column(name = "\"idTipoPessoa\"")
    private Integer idTipoPessoa;

    @ManyToOne
    @JoinColumn(name = "\"idTipoPessoa\"", referencedColumnName = "\"idTipoPessoa\"", insertable = false, updatable = false)
    private TipoPessoa tipoPessoa;

    @Column(name = "\"Matricula\"")
    private String matricula;

    @Column(name = "\"SiglaPosto\"")
    private String siglaPosto;

    @Column(name = "\"cdSituacao\"")
    private Integer cdSituacao;

    @Column(name = "\"flgEmPagamento\"")
    private Boolean flgEmPagamento;

    public Vinculo() {
    }

    // Getters e Setters
    public String getIdVinculo() {
        return idVinculo;
    }

    public void setIdVinculo(String idVinculo) {
        this.idVinculo = idVinculo;
    }

    public String getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(String idPessoa) {
        this.idPessoa = idPessoa;
    }

    public Integer getIdTipoPessoa() {
        return idTipoPessoa;
    }

    public void setIdTipoPessoa(Integer idTipoPessoa) {
        this.idTipoPessoa = idTipoPessoa;
    }

    public TipoPessoa getTipoPessoa() {
        return tipoPessoa;
    }

    public void setTipoPessoa(TipoPessoa tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getSiglaPosto() {
        return siglaPosto;
    }

    public void setSiglaPosto(String siglaPosto) {
        this.siglaPosto = siglaPosto;
    }

    public Integer getCdSituacao() {
        return cdSituacao;
    }

    public void setCdSituacao(Integer cdSituacao) {
        this.cdSituacao = cdSituacao;
    }

    public Boolean getFlgEmPagamento() {
        return flgEmPagamento;
    }

    public void setFlgEmPagamento(Boolean flgEmPagamento) {
        this.flgEmPagamento = flgEmPagamento;
    }
}