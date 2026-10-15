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

    @Value("${app.crypto.key}")
    private String cryptoKey;

    public TtcService(TtcRepository ttcRepository) {
        this.ttcRepository = ttcRepository;
    }

    @Transactional
    public String removerPublicacao(Long idPessoa) {
        boolean existe = ttcRepository.existsByIdPessoa(idPessoa);
        if (!existe) {
            return "Cadastro não encontrado.";
        }

        ttcRepository.findByIdPessoa(idPessoa).ifPresent(ttc -> {
            ttcRepository.deletarAssuntosPorIdTtc(ttc.getId());
        });

        // Passa "N" (ou null, dependendo da sua regra para removido) para o campo contratado
        int linhas = ttcRepository.atualizarTtcNativo(
            idPessoa,
            null, 
            "0",  
            null, 
            "0",  
            "N",  // <--- Adicionado o parâmetro contratado
            null  
        );

        if (linhas == 0) {
            ttcRepository.inserirTtcNativo(
                idPessoa,
                null,
                "0",
                null,
                "0",
                "N",  // <--- Adicionado o parâmetro contratado
                null
            );
        }

        return "Publicação removida com sucesso.";
    }
    
    @Transactional(readOnly = true)
    public Optional<TtcDadosUsuarioDTO> buscarDadosUsuario(Long idPessoa) {
        if (idPessoa == null) {
            System.out.println("=== [DEBUG GET] idPessoa veio NULO ===");
            return Optional.empty();
        }

        System.out.println("=== [DEBUG GET] Buscando dados do TTC para idPessoa: " + idPessoa + " ===");

        List<Object[]> resultados = ttcRepository.buscarDadosTtcPorIdPessoa(idPessoa, cryptoKey);
        if (resultados == null || resultados.isEmpty()) {
            System.out.println("=== [DEBUG GET] Nenhum registro encontrado na query para idPessoa: " + idPessoa + " ===");
            return Optional.empty();
        }

        Object[] row = resultados.get(0);

        Long idTtc = ((Number) row[0]).longValue();
        String nip = (String) row[1];
        Character status = row[2] != null ? row[2].toString().charAt(0) : '0';
        Integer comandoBitmask = row[3] != null ? ((Number) row[3]).intValue() : 0;
        
        LocalDate dtAtualizacao = null;
        if (row[4] != null) {
            if (row[4] instanceof LocalDate) {
                dtAtualizacao = (LocalDate) row[4];
            } else if (row[4] instanceof java.sql.Date) {
                dtAtualizacao = ((java.sql.Date) row[4]).toLocalDate();
            }
        }

        String om = (String) row[5];
        String nomeCompleto = (String) row[6];
        String vinculo = (String) row[7];
        
        Character aceitouTermo = '0';
        Object aceitouTermoObj = row[8];
        if (aceitouTermoObj != null) {
            if (aceitouTermoObj instanceof Boolean) {
                aceitouTermo = (Boolean) aceitouTermoObj ? '1' : '0';
            } else if (aceitouTermoObj instanceof Number) {
                aceitouTermo = ((Number) aceitouTermoObj).intValue() == 1 ? '1' : '0';
            } else {
                String val = aceitouTermoObj.toString();
                aceitouTermo = ("1".equals(val) || "true".equalsIgnoreCase(val) || "S".equalsIgnoreCase(val)) ? '1' : '0';
            }
        }

        String outrasInfo = (String) row[9];
        Long idArea = row[10] != null ? ((Number) row[10]).longValue() : null;
        
        // Pega a OM pretendida cadastrada no banco (posição 11 do SELECT)
        Long omPretendidaId = (row.length > 11 && row[11] != null) ? ((Number) row[11]).longValue() : null;

        String primeiroNome = (nomeCompleto != null && !nomeCompleto.isBlank()) 
                ? nomeCompleto.trim().split("\\s+")[0] 
                : "Usuário";

        List<Integer> comandosDecodificados = decodificarComandosBitmask(comandoBitmask);
        List<Long> assuntos = ttcRepository.buscarIdsAssuntosPorIdTtc(idTtc); 

        System.out.println("=== [DEBUG GET] Dados encontrados! OM Pretendida ID: " + omPretendidaId + " | Comandos: " + comandosDecodificados + " | Assuntos: " + assuntos + " ===");

        return Optional.of(new TtcDadosUsuarioDTO(
            idTtc, nip, primeiroNome, om, vinculo, status, 
            aceitouTermo, outrasInfo, comandosDecodificados, idArea, dtAtualizacao, assuntos, omPretendidaId
        ));
    }

    @Transactional
    public String cadastrarOuAtualizarTtc(SalvarTtcRequestDTO dto) {
        System.out.println("=== [DEBUG] Assuntos recebidos no DTO: " + dto.assuntos() + " ===");
        System.out.println("=== [DEBUG] Comandos/Distritos recebidos no DTO: " + dto.comandoServir() + " ===");

        Integer comandoBitmask = 0;
        if (dto.comandoServir() != null && !dto.comandoServir().isEmpty()) {
            for (Integer idDistrito : dto.comandoServir()) {
                if (idDistrito >= 1 && idDistrito <= 9) {
                    comandoBitmask |= (1 << (9 - idDistrito));
                }
            }
        }

        // Define 'N' para a coluna contratado ao salvar/atualizar
        String statusContratado = "N";

        int linhasAfetadas = ttcRepository.atualizarTtcNativo(
            dto.idPessoa(),
            dto.infoComplementar(),
            "1",
            comandoBitmask,
            "1",
            statusContratado, // Passa 'N' aqui
            dto.omPretendidaId()
        );

        if (linhasAfetadas == 0) {
            ttcRepository.inserirTtcNativo(
                dto.idPessoa(),
                dto.infoComplementar(),
                "1",
                comandoBitmask,
                "1",
                statusContratado, // Passa 'N' aqui
                dto.omPretendidaId()
            );
        }

        Long idTtc = ttcRepository.findByIdPessoa(dto.idPessoa())
                .map(Ttc::getId)
                .orElseThrow(() -> new RuntimeException("Erro ao localizar registro TTC para sincronizar áreas de interesse."));

        ttcRepository.deletarAssuntosPorIdTtc(idTtc);
        if (dto.assuntos() != null && !dto.assuntos().isEmpty()) {
            for (Long idAssunto : dto.assuntos()) {
                ttcRepository.inserirAssuntoUsuario(idAssunto, idTtc);
            }
        }

        return "Cadastro de TTC salvo e publicado com sucesso.";
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

    @Transactional(readOnly = true)
    public List<ItemOpcaoDTO> listarOrganizacoesMilitares() {
        List<Object[]> resultados = ttcRepository.buscarOrganizacoesMilitares();
        List<ItemOpcaoDTO> lista = new ArrayList<>();
        for (Object[] row : resultados) {
            Long id = ((Number) row[0]).longValue();
            String sigla = (String) row[1];
            String nome = (String) row[2];
            String rotulo = (sigla != null && !sigla.isBlank()) ? sigla + " - " + nome : nome;
            lista.add(new ItemOpcaoDTO(id, rotulo));
        }
        return lista;
    }
}