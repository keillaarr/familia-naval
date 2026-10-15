package com.familianaval.api.module.ttc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.ttc.model.Ttc;

import jakarta.transaction.Transactional;

@Repository
public interface TtcRepository extends JpaRepository<Ttc, Long> {

    Optional<Ttc> findByIdPessoa(Long idPessoa);

    boolean existsByIdPessoa(Long idPessoa);

    // Busca dados completos do TTC por idPessoa com conversão segura de tipos (VARCHAR) e descriptografia
    @Query(value = """
        SELECT 
            t.id, 
            CAST(pgp_sym_decrypt(p.nip::bytea, :cryptoKey) AS VARCHAR) AS nip, 
            t.ativo, 
            t."ComandosServir" AS comandosservir, 
            t.dataultimaatualizacao, 
            om.sigla AS om_pretendida_sigla, 
            CAST(pgp_sym_decrypt(p.nomecpessoa::bytea, :cryptoKey) AS VARCHAR) AS nome_completo, 
            'TTC' AS vinculo, 
            t."AceitouTermo" AS aceitoutermo, 
            t."outrasInformacoes" AS outrasinformacoes, 
            NULL AS idarea,
            t.om_pretendida_id AS om_pretendida_id
        FROM public.ttc t
        INNER JOIN public.pessoa p ON CAST(t.idpessoa AS VARCHAR) = CAST(p.idpessoa AS VARCHAR)
        LEFT JOIN public.organizacoes_militares om ON t.om_pretendida_id = om.id
        WHERE CAST(p.idpessoa AS VARCHAR) = CAST(:idPessoa AS VARCHAR)
        LIMIT 1
    """, nativeQuery = true)
    List<Object[]> buscarDadosTtcPorIdPessoa(@Param("idPessoa") Long idPessoa, @Param("cryptoKey") String cryptoKey);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE public.ttc
        SET dataultimaatualizacao = CURRENT_DATE,
            "outrasInformacoes" = :outrasInformacoes,
            ativo = CAST(:ativo AS bit),
            "ComandosServir" = :comandosServir,
            "AceitouTermo" = CAST(:aceitouTermo AS bit),
            contratado = :contratado,
            om_pretendida_id = :omPretendidaId
        WHERE idpessoa = :idPessoa
    """, nativeQuery = true)
    int atualizarTtcNativo(
        @Param("idPessoa") Long idPessoa,
        @Param("outrasInformacoes") String outrasInformacoes,
        @Param("ativo") String ativo,
        @Param("comandosServir") Integer comandosServir,
        @Param("aceitouTermo") String aceitouTermo,
        @Param("contratado") String contratado,
        @Param("omPretendidaId") Long omPretendidaId
    );

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO public.ttc (id, idpessoa, dataultimaatualizacao, "outrasInformacoes", ativo, "ComandosServir", "AceitouTermo", contratado, om_pretendida_id)
        VALUES (
            (SELECT COALESCE(MAX(id), 0) + 1 FROM public.ttc),
            :idPessoa, 
            CURRENT_DATE, 
            :outrasInformacoes, 
            CAST(:ativo AS bit), 
            :comandosServir, 
            CAST(:aceitouTermo AS bit), 
            :contratado,
            :omPretendidaId
        )
    """, nativeQuery = true)
    void inserirTtcNativo(
        @Param("idPessoa") Long idPessoa,
        @Param("outrasInformacoes") String outrasInformacoes,
        @Param("ativo") String ativo,
        @Param("comandosServir") Integer comandosServir,
        @Param("aceitouTermo") String aceitouTermo,
        @Param("contratado") String contratado,
        @Param("omPretendidaId") Long omPretendidaId
    );

    // =========================================================================
    // MÉTODOS PARA GERENCIAR A TABELA ASSOCIATIVA (ttc_area_interesse)
    // =========================================================================

    @Query(value = "SELECT area_interesse_id FROM public.ttc_area_interesse WHERE ttc_id = :idTtc", nativeQuery = true)
    List<Long> buscarIdsAssuntosPorIdTtc(@Param("idTtc") Long idTtc);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM public.ttc_area_interesse WHERE ttc_id = :idTtc", nativeQuery = true)
    void deletarAssuntosPorIdTtc(@Param("idTtc") Long idTtc);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO public.ttc_area_interesse (ttc_id, area_interesse_id) VALUES (:idTtc, :idAssunto) ON CONFLICT DO NOTHING", nativeQuery = true)
    void inserirAssuntoUsuario(@Param("idAssunto") Long idAssunto, @Param("idTtc") Long idTtc);

    // =========================================================================
    // CONSULTAS DE APOIO E OPÇÕES DO SISTEMA
    // =========================================================================

    @Query(value = "SELECT id, nome FROM public.ttc_distrito ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarDistritos();

    // Busca as áreas/assuntos cadastrados na tabela oficial normalizada
    @Query(value = "SELECT id, nome FROM public.area_interesse ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAreas();

    @Query(value = "SELECT id, nome FROM public.ttc_assunto ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAssuntos();

    // Listar Organizações Militares para seleção no Frontend
    @Query(value = "SELECT id, sigla, nome FROM public.organizacoes_militares ORDER BY sigla", nativeQuery = true)
    List<Object[]> buscarOrganizacoesMilitares();
}