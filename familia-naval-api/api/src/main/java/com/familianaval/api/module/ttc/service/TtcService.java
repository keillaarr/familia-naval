package com.familianaval.api.module.ttc.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.familianaval.api.module.ttc.dto.ItemOpcaoDTO;
import com.familianaval.api.module.ttc.dto.SalvarTtcRequestDTO;
import com.familianaval.api.module.ttc.dto.TtcDadosUsuarioDTO;
import com.familianaval.api.module.ttc.model.Ttc;
import com.familianaval.api.module.ttc.repository.TtcRepository;

@Service
public class TtcService {

    private final TtcRepository ttcRepository;
    private final String cryptoKey;

    public TtcService(
            TtcRepository ttcRepository, 
            @Value("${app.crypto.key:bf}") String cryptoKey) {
        this.ttcRepository = ttcRepository;
        this.cryptoKey = cryptoKey;
    }

    @Transactional(readOnly = true)
    public Optional<TtcDadosUsuarioDTO> buscarDadosUsuario(String cpf) {
        String cpfLimpo = (cpf != null) ? cpf.replaceAll("\\D", "") : "";

        Optional<Object[]> resultOpt = ttcRepository.buscarDadosTtcPorCpf(cpfLimpo, cryptoKey);
        if (resultOpt.isEmpty()) {
            return Optional.empty();
        }

        Object[] row = resultOpt.get();
        Long idTtc = ((Number) row[0]).longValue();
        String nip = (String) row[1];
        Character status = row[2] != null ? row[2].toString().charAt(0) : '0';
        Integer comandoBitmask = row[3] != null ? ((Number) row[3]).intValue() : 0;
        LocalDate dtAtualizacao = row[4] != null ? ((java.sql.Date) row[4]).toLocalDate() : null;
        String posto = (String) row[5];
        String nomeCompleto = (String) row[6];
        String vinculo = (String) row[7];
        Character aceitouTermo = row[8] != null ? row[8].toString().charAt(0) : '0';
        String outrasInfo = (String) row[9];
        Long idArea = row[10] != null ? ((Number) row[10]).longValue() : null;

        String primeiroNome = (nomeCompleto != null && !nomeCompleto.isBlank()) 
                ? nomeCompleto.trim().split("\\s+")[0] 
                : "Usuário";

        List<Integer> comandosDecodificados = decodificarComandosBitmask(comandoBitmask);
        List<Long> assuntos = ttcRepository.buscarIdsAssuntosPorIdTtc(idTtc);

        return Optional.of(new TtcDadosUsuarioDTO(
            idTtc, nip, primeiroNome, posto, vinculo, status, 
            aceitouTermo, outrasInfo, comandosDecodificados, idArea, dtAtualizacao, assuntos
        ));
    }

    @Transactional
    public String cadastrarOuAtualizarTtc(SalvarTtcRequestDTO dto) {
        Long idPessoaLong = dto.idPessoa();

        // Busca pelo campo escalar 'idPessoa' presente no Ttc.java
        Ttc ttc = ttcRepository.findByIdPessoa(idPessoaLong)
                .orElseGet(() -> {
                    Ttc novoTtc = new Ttc();
                    novoTtc.setId(ttcRepository.obterProximoIdTtc());
                    novoTtc.setIdPessoa(idPessoaLong);
                    return novoTtc;
                });

        ttc.setDataUltimaAtualizacao(LocalDate.now());
        ttc.setOutrasInformacoes(dto.infoComplementar());
        ttc.setAtivo("1");
        ttc.setComandosServir(dto.comandoServir());
        ttc.setAceitouTermo("1");
        ttc.setContratado(null);

        ttcRepository.save(ttc);

        // Atualização dos Assuntos vinculados ao TTC
        ttcRepository.deletarAssuntosPorIdTtc(ttc.getId());
        
        if (dto.idAssuntos() != null && !dto.idAssuntos().isEmpty()) {
            Long proximoIdAssunto = ttcRepository.obterProximoIdAssuntoUsuario();
            for (Long idAssunto : dto.idAssuntos()) {
                ttcRepository.inserirAssuntoUsuario(proximoIdAssunto++, idAssunto, ttc.getId());
            }
        }

        return "Cadastro de TTC salvo e publicado com sucesso.";
    }

    @Transactional
    public String removerPublicacao(Long idPessoa) {
        return ttcRepository.findByIdPessoa(idPessoa)
                .map(ttc -> {
                    ttc.setAtivo("0");
                    ttc.setAceitouTermo("0");
                    ttcRepository.save(ttc);
                    return "Publicação removida com sucesso.";
                })
                .orElse("Cadastro não encontrado.");
    }

    @Transactional(readOnly = true)
    public List<ItemOpcaoDTO> listarDistritos() {
        return mapearParaDTO(ttcRepository.buscarDistritos());
    }

    @Transactional(readOnly = true)
    public List<ItemOpcaoDTO> listarAreas() {
        return mapearParaDTO(ttcRepository.buscarAreas());
    }

    @Transactional(readOnly = true)
    public List<ItemOpcaoDTO> listarAssuntos() {
        return mapearParaDTO(ttcRepository.buscarAssuntos());
    }

    private List<Integer> decodificarComandosBitmask(Integer comando) {
        List<Integer> lista = new ArrayList<>();
        if (comando == null || comando <= 0) {
            return lista;
        }

        for (int i = 1; i <= 9; i++) {
            int mascara = 1 << (9 - i);
            if ((comando & mascara) != 0) {
                lista.add(i);
            }
        }
        return lista;
    }

    private List<ItemOpcaoDTO> mapearParaDTO(List<Object[]> resultados) {
        List<ItemOpcaoDTO> lista = new ArrayList<>();
        for (Object[] row : resultados) {
            Long id = ((Number) row[0]).longValue();
            String nome = (String) row[1];
            lista.add(new ItemOpcaoDTO(id, nome));
        }
        return lista;
    }
}