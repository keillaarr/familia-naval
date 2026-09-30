package com.familianaval.api.module.endereco.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.endereco.dto.EnderecoResponseDTO;
import com.familianaval.api.module.endereco.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, String> {

    @Query("SELECT new com.familianaval.api.module.endereco.dto.EnderecoResponseDTO(" +
           "e.idPessoa, e.cdCidade, c.nomecidade, e.enderecoRua, e.enderecoNumero, " +
           "e.enderecoComplemento, e.enderCoBairro, e.cep, e.telefone1, e.celular, e.email) " +
           "FROM Endereco e JOIN Cidade c ON e.cdCidade = c.cdcidade " +
           "WHERE e.idPessoa = :idPessoa")
    EnderecoResponseDTO buscarEnderecoPorPessoa(@Param("idPessoa") String idPessoa);
}