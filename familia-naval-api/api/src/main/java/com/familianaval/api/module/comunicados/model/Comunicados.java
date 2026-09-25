package com.familianaval.api.module.comunicados.model;

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
@Table(name = "comunicados", schema = "public")
public class Comunicados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cpfusuario", length = 11)
    private String cpfUsuario;

    @Column(name = "assunto")
    private String assunto;

    @Column(name = "cpfautor", length = 11)
    private String cpfAutor;

    @Column(name = "nomearquivo")
    private String nomeArquivo;

    @Column(name = "datadocumento")
    private LocalDate dataDocumento;

    @Column(name = "lido")
    private Integer lido;

    // Getters e Setters
}