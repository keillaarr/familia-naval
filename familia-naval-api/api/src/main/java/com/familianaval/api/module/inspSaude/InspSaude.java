package com.familianaval.api.module.inspSaude;

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

    @Column(name = "email")
    private String email;

    @Column(name = "leu")
    private Boolean leu;

    // Getters e Setters
}