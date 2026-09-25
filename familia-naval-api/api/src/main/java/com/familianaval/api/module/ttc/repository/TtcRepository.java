package com.familianaval.api.module.ttc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.familianaval.api.module.ttc.model.Ttc;

@Repository
public interface TtcRepository extends JpaRepository<Ttc, Long> {

    Optional<Ttc> findByIdPessoa(Long idPessoa);

    // 1. Busca dados completos do TTC por CPF criptografado
    @Query(value = """
        SELECT 
            t.id, 
            p.nip, 
            t.ativo, 
            t.comandosservir, 
            t.dataultimaatualizacao, 
            p.siglaom AS posto, 
            p.nomecpessoa AS nome_completo, 
            'TTC' AS vinculo, 
            t.aceitoutermo, 
            t.outrasinformacoes, 
            ta.idarea
        FROM public.ttc t
        INNER JOIN public.pessoa p ON t.idpessoa = CAST(p.idpessoa AS integer)
        LEFT JOIN public.ttc_assuntousuario tau ON tau.idttc = t.id
        LEFT JOIN public.ttc_assunto ta ON ta.id = tau.idassunto
        WHERE pgp_sym_decrypt(p.cpfpessoa::bytea, :cryptoKey) = :cpf
        LIMIT 1
    """, nativeQuery = true)
    Optional<Object[]> buscarDadosTtcPorCpf(@Param("cpf") String cpf, @Param("cryptoKey") String cryptoKey);

    // 2. Busca lista de IDs dos assuntos vinculados ao TTC
    @Query(value = "SELECT tau.idassunto FROM public.ttc_assuntousuario tau WHERE tau.idttc = :idTtc", nativeQuery = true)
    List<Long> buscarIdsAssuntosPorIdTtc(@Param("idTtc") Long idTtc);

    // 3. Obter próximo ID para a tabela ttc
    @Query(value = "SELECT COALESCE(MAX(id), 0) + 1 FROM public.ttc", nativeQuery = true)
    Long obterProximoIdTtc();

    // 4. Deletar vínculos de assuntos por idttc
    @Modifying
    @Query(value = "DELETE FROM public.ttc_assuntousuario WHERE idttc = :idTtc", nativeQuery = true)
    void deletarAssuntosPorIdTtc(@Param("idTtc") Long idTtc);

    // 5. Obter próximo ID para a tabela ttc_assuntousuario
    @Query(value = "SELECT COALESCE(MAX(id), 0) + 1 FROM public.ttc_assuntousuario", nativeQuery = true)
    Long obterProximoIdAssuntoUsuario();

    // 6. Inserir vínculo entre TTC e Assunto
    @Modifying
    @Query(value = "INSERT INTO public.ttc_assuntousuario (id, idassunto, idttc) VALUES (:id, :idAssunto, :idTtc)", nativeQuery = true)
    void inserirAssuntoUsuario(@Param("id") Long id, @Param("idAssunto") Long idAssunto, @Param("idTtc") Long idTtc);

    // 7. Listar opções de Distritos
    @Query(value = "SELECT id, nome FROM public.ttc_distrito ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarDistritos();

    // 8. Listar opções de Áreas
    @Query(value = "SELECT id, nome FROM public.ttc_area ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAreas();

    // 9. Listar opções de Assuntos
    @Query(value = "SELECT id, nome FROM public.ttc_assunto ORDER BY nome", nativeQuery = true)
    List<Object[]> buscarAssuntos();
}