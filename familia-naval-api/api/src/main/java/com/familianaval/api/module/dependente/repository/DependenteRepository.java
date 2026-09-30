package com.familianaval.api.module.dependente.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.dependente.model.Dependente;

import java.util.List;

@Repository
public interface DependenteRepository extends JpaRepository<Dependente, String> {
    List<Dependente> findByNipTit(String nipTit);
}