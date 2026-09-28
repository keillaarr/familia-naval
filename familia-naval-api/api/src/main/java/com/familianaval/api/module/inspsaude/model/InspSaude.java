package com.familianaval.api.module.inspsaude.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "inspsaude", schema = "public")
public class InspSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "processo")
    private String processo;

    @Column(name = "dataentrada")
    private LocalDate dataEntrada;

    @Column(name = "nome")
    private String nome;

    @Column(name = "nip")
    private Integer nip;

    @Column(name = "postograd")
    private String postoGrad;

    @Column(name = "quadroesp")
    private String quadroEsp;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "estado")
    private String estado;

    @Column(name = "cep")
    private Integer cep;

    @Column(name = "tel")
    private Integer tel;

    @Column(name = "cel", length = 11)
    private String cel;

    @Column(name = "email")
    private String email;

    @Column(name = "beneficios")
    private String beneficios;

    @Column(name = "leu")
    private Boolean leu;

    @Column(name = "recebercomunicacao")
    private String receberComunicacao;

    @Column(name = "cidade")
    private String cidade;
}