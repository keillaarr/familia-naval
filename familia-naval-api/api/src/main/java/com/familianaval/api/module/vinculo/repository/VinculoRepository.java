package com.familianaval.api.module.vinculo.repository;

import com.familianaval.api.module.vinculo.model.Vinculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VinculoRepository extends JpaRepository<Vinculo, String> {

    // Busca o vínculo utilizando o campo idPessoa da tabela vinculo
    Optional<Vinculo> findByIdPessoa(String idPessoa);

}