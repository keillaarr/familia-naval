package com.familianaval.api.module.pessoa.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "pessoa", schema = "public")
public class Pessoa {

    @Id
    @Column(name = "idpessoa", nullable = false)
    private String idpessoa;

    @Column(name = "cpfpessoa")
    private String cpfpessoa;

    @Column(name = "nomecpessoa")
    private String nomecpessoa;

    @Column(name = "nomeapessoa")
    private String nomeapessoa;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "dtnascimento")
    private String dtnascimento;

    @Column(name = "siglaom")
    private String siglaom;

    @Column(name = "nip")
    private String nip;

    @Column(name = "dtultrecadastramento")
    private String dtultrecadastramento;

    @Column(name = "dtproxrecadastramento")
    private String dtproxrecadastramento;

    @Column(name = "hashpessoa")
    private String hashpessoa;


// Getters e Setters...
}