package com.familianaval.api.module.endereco.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.familianaval.api.module.endereco.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, String> {
}