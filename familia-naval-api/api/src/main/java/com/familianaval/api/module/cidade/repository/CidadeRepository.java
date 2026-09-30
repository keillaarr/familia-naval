package com.familianaval.api.module.cidade.repository;

import com.familianaval.api.module.cidade.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, String> {

    // Retorna todas as UFs ordenadas (ex: AC, AL, BA, RJ, SP...)
    @Query("SELECT DISTINCT c.siglauf FROM Cidade c ORDER BY c.siglauf")
    List<String> findAllUfs();

    // Retorna todas as cidades de uma determinada UF ordenadas pelo nome
    List<Cidade> findBySiglaufOrderByNomecidadeAsc(String siglauf);
}