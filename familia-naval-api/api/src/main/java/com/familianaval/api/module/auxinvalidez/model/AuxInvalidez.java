package com.familianaval.api.module.auxinvalidez.model;
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
@Table(name = "auxinvalidez", schema = "public")
public class AuxInvalidez {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "nip", nullable = false)
    private String nip;

    @Column(name = "posto")
    private String posto;

    @Column(name = "exerce")
    private Boolean exerce;

    @Column(name = "data_envio")
    private LocalDate dataEnvio;

    // Getters e Setters
}