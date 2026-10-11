package com.familianaval.api.module.ttc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.ttc.model.Ttc;

@Repository
public interface TtcRepository extends JpaRepository<Ttc, Long> {

    Optional<Ttc> findByIdPessoa(Long idPessoa);

    boolean existsByIdPessoa(Long idPessoa);

    // Busca dados completos do TTC por CPF com descriptografia de NIP e Nome
   @Query(value = """
        SELECT 
            t.id, 
            CAST(pgp_sym_decrypt(p.nip::bytea, :cryptoKey) AS VARCHAR) AS nip, 
            t.ativo, 
            t."ComandosServir" AS comandosservir, 
            t.dataultimaatualizacao, 
            om.sigla AS posto, 
            CAST(pgp_sym_decrypt(p.nomecpessoa::bytea, :cryptoKey) AS VARCHAR) AS nome_completo, 
            'TTC' AS vinculo, 
            t."AceitouTermo" AS aceitoutermo, 
            t."outrasInformacoes" AS outrasinformacoes, 
            NULL AS idarea,
            t.om_pretendida_id
        FROM public.ttc t
        INNER JOIN public.pessoa p ON t.idpessoa = CAST(p.idpessoa AS integer)
        LEFT JOIN public.organizacoes_militares om ON t.om_pretendida_id = om.id
        WHERE p.cpfpessoa = :cpf
        LIMIT 1
    """, nativeQuery = true)
    List<Object[]> buscarDadosTtcPorCpf(@Param("cpf") String cpf, @Param("cryptoKey") String cryptoKey);

    // Métodos de apoio / fallbacks
    default List<Long> buscarIdsAssuntosPorIdTtc(Long idTtc) {
        return List.of();
    }

    default void deletarAssuntosPorIdTtc(Long idTtc) {
        // Não faz nada
    }

    default void inserirAssuntoUsuario(Long idAssunto, Long idTtc) {
        // Não faz nada
    }

    // Listar opções
    @Query(value = "SELECT id, nome FROM public.ttc_distrito ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarDistritos();

    @Query(value = "SELECT id, nome FROM public.ttc_area ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAreas();

    @Query(value = "SELECT id, nome FROM public.ttc_assunto ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAssuntos();
}