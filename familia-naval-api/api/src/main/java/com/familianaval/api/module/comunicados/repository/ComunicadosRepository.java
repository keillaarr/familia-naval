package com.familianaval.api.module.comunicados.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.comunicados.model.Comunicados;

@Repository
public interface ComunicadosRepository extends JpaRepository<Comunicados, Integer> {
    
    // Método para buscar comunicados por utilizador/CPF
    List<Comunicados> findByCpfUsuario(String cpfUsuario);
}