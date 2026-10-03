package com.familianaval.api.module.proventos.repository;

import com.familianaval.api.module.proventos.model.Proventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProventosRepository extends JpaRepository<Proventos, String> {
    // Como a chave primária é o CPF (String), o JpaRepository já nos dá métodos prontos 
    // como save(), findById(), deleteById(), etc.
}