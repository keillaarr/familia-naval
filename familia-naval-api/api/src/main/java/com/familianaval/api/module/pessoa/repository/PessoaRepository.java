package com.familianaval.api.module.pessoa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.pessoa.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, String> {

    Optional<Pessoa> findByCpfpessoa(String cpfpessoa);

    Optional<Pessoa> findByNip(String nip);

    // 0. Descriptografia do nome da pessoa por ID
    @Query(value = """
        SELECT pgp_sym_decrypt(p.nomecpessoa::bytea, :cryptoKey) 
        FROM public.pessoa p
        WHERE CAST(p.idpessoa AS text) = :idPessoa
        LIMIT 1
    """, nativeQuery = true)
    String descriptografarNomePorId(@Param("idPessoa") String idPessoa, @Param("cryptoKey") String cryptoKey);

    // 1. Proventos (DACP) - Valida declaração no ano vigente
    @Query(value = """
        SELECT CASE 
            WHEN :cpf IS NULL OR TRIM(:cpf) = '' THEN FALSE
            ELSE EXISTS (
                SELECT 1 
                FROM public.proventos pr
                WHERE pr.cpf = :cpf
                  AND EXTRACT(YEAR FROM pr.dthora) = EXTRACT(YEAR FROM CURRENT_DATE)
            )
        END
    """, nativeQuery = true)
    boolean jaDeclarouNoAnoVigente(@Param("cpf") String cpf);

    // 2. TTC - Busca por idpessoa
    @Query(value = """
        SELECT t.* 
        FROM public.ttc t
        WHERE t.idpessoa = CAST(:idPessoa AS integer)
    """, nativeQuery = true)
    List<Object[]> buscarTtcPorIdPessoa(@Param("idPessoa") String idPessoa);

    // 3. Comunicados - Busca por CPF do usuário
    @Query(value = """
        SELECT c.* 
        FROM public.comunicados c
        WHERE c.cpfusuario = :cpf
    """, nativeQuery = true)
    List<Object[]> buscarComunicadosPorCpf(@Param("cpf") String cpf);

    // 4. Inspeção de Saúde - Busca por NIP
    @Query(value = """
        SELECT i.* 
        FROM public.inspsaude i
        WHERE i.nip = CAST(:nip AS integer)
    """, nativeQuery = true)
    List<Object[]> buscarInspSaudePorNip(@Param("nip") String nip);

    // 5. Auxílio Invalidez - Busca por CPF ou NIP
    @Query(value = """
        SELECT ai.* 
        FROM public.auxinvalidez ai
        WHERE ai.cpf = :cpf OR ai.nip = :nip
    """, nativeQuery = true)
    List<Object[]> buscarAuxInvalidezPorCpfOuNip(@Param("cpf") String cpf, @Param("nip") String nip);

    @Query(value = """
        SELECT 
            p.dtultrecadastramento, 
            p.dtproxrecadastramento
        FROM public.pessoa p
        WHERE pgp_sym_decrypt(p.cpfpessoa::bytea, :cryptoKey) = :cpf
        LIMIT 1
    """, nativeQuery = true)
    Optional<Object[]> buscarDatasRecadastramentoPorCpf(@Param("cpf") String cpf, @Param("cryptoKey") String cryptoKey);

    // 6. Requisição - Busca por número da requisição
    @Query(value = """
        SELECT 
            r.nrrequisicao, 
            r.dataregistro, 
            COALESCE(sr.descricao, CAST(r.cdstatus AS text)) AS status_descricao
        FROM public.requisicao r
        LEFT JOIN public."StatusRequisicao" sr 
               ON r.cdstatus = sr."cdStatus"
        WHERE TRIM(CAST(r.nrrequisicao AS text)) = TRIM(:nrRequisicao)
           OR TRIM(CAST(r.idrequisicao AS text)) = TRIM(:nrRequisicao)
        LIMIT 1
    """, nativeQuery = true)
    Optional<Object[]> buscarRequisicaoPorNumero(@Param("nrRequisicao") String nrRequisicao);
}