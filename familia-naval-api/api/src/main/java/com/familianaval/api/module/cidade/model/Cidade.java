package com.familianaval.api.module.cidade.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cidade", schema = "public")
public class Cidade {

    @Id
    @Column(name = "cdcidade", length = 50, nullable = false)
    private String cdcidade;

    @Column(name = "nomecidade", length = 60, nullable = false)
    private String nomecidade;

    @Column(name = "siglauf", length = 2, nullable = false)
    private String siglauf;

    @Column(name = "\"siglaOM\"", length = 15, nullable = false)
    private String siglaOM;

    @Column(name = "\"OMAC_OREC\"", length = 15, nullable = false)
    private String omacOrec;

    // Construtor vazio obrigatório pelo JPA
    public Cidade() {
    }

    // Getters e Setters
    public String getCdcidade() {
        return cdcidade;
    }

    public void setCdcidade(String cdcidade) {
        this.cdcidade = cdcidade;
    }

    public String getNomecidade() {
        return nomecidade;
    }

    public void setNomecidade(String nomecidade) {
        this.nomecidade = nomecidade;
    }

    public String getSiglauf() {
        return siglauf;
    }

    public void setSiglauf(String siglauf) {
        this.siglauf = siglauf;
    }

    public String getSiglaOM() {
        return siglaOM;
    }

    public void setSiglaOM(String siglaOM) {
        this.siglaOM = siglaOM;
    }

    public String getOmacOrec() {
        return omacOrec;
    }

    public void setOmacOrec(String omacOrec) {
        this.omacOrec = omacOrec;
    }
}