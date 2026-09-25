package com.familianaval.api.module.pessoa.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.familianaval.api.module.pessoa.dto.AuxilioInvalidezDTO;
import com.familianaval.api.module.pessoa.dto.PessoaHomeDTO;
import com.familianaval.api.module.pessoa.dto.ProvaVidaDTO;
import com.familianaval.api.module.pessoa.dto.RequisicaoDTO;
import com.familianaval.api.module.pessoa.model.Pessoa;
import com.familianaval.api.module.pessoa.repository.PessoaRepository;

import jakarta.persistence.EntityManager;

@Service
public class PessoaService {

    private static final Logger log = LoggerFactory.getLogger(PessoaService.class);

    private final PessoaRepository pessoaRepository;
    private final String cryptoKey;

    public PessoaService(
            PessoaRepository pessoaRepository,
            @Value("${app.crypto.key:bf}") String cryptoKey,
            EntityManager entityManager) {
        this.pessoaRepository = pessoaRepository;
        this.cryptoKey = cryptoKey;
    }

    @Transactional(readOnly = true)
    public Optional<PessoaHomeDTO> buscarDadosHomePorCpf(String identificador) {
        if (identificador == null || identificador.isBlank()) {
            log.warn("Identificador informado está nulo ou vazio.");
            return Optional.empty();
        }

        String termosLimpos = identificador.replaceAll("\\D", "");
        log.info("Iniciando busca no banco para o identificador: {}", termosLimpos);

        // 1. Busca por CPF direta
        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(termosLimpos);

        // 2. Fallback por NIP
        if (pessoaOpt.isEmpty()) {
            log.info("Registro não localizado por CPF. Tentando busca por NIP...");
            pessoaOpt = pessoaRepository.findByNip(termosLimpos);
        }

        if (pessoaOpt.isEmpty()) {
            log.warn("Nenhuma pessoa foi localizada com o identificador: {}", identificador);
            return Optional.empty();
        }

        Pessoa pessoa = pessoaOpt.get();

        // 3. Executa a descriptografia do nome
        String nomeDescriptografado = descriptografarNome(pessoa.getIdpessoa(), cryptoKey);
        
        String nomeCompleto = (nomeDescriptografado != null && !nomeDescriptografado.isBlank()) 
                ? nomeDescriptografado 
                : pessoa.getNomecpessoa();

        String primeiroNome = (nomeCompleto != null && !nomeCompleto.isBlank()) 
                ? nomeCompleto.trim().split("\\s+")[0] 
                : "Usuário";

        // 4. Define tratamento e mensagem de saudação
        String tratamento = "F".equalsIgnoreCase(pessoa.getSexo()) ? "Sra." : "Sr.";

        String om = (pessoa.getSiglaom() != null && !pessoa.getSiglaom().isBlank()) 
                ? pessoa.getSiglaom() 
                : "SVPM";
        String mensagemSaudacao = String.format("O %s está no %s!", tratamento, om);

        // 5. Verifica a regra da declaração DACP
        boolean jaDeclarouNoAnoVigente = false;
        try {
            String cpfParaConsulta = pessoa.getCpfpessoa();
            if (cpfParaConsulta != null && !cpfParaConsulta.isBlank()) {
                jaDeclarouNoAnoVigente = pessoaRepository.jaDeclarouNoAnoVigente(cpfParaConsulta.replaceAll("\\D", ""));
            }
        } catch (Exception e) {
            log.error("Erro ao verificar status da declaração DACP para a pessoa ID {}: {}", pessoa.getIdpessoa(), e.getMessage());
        }

        return Optional.of(new PessoaHomeDTO(
            primeiroNome,
            tratamento,
            mensagemSaudacao,
            jaDeclarouNoAnoVigente
        ));
    }

    /**
     * Consulta os dados de Prova de Vida / Recadastramento para a tela do front-end.
     */
    @Transactional(readOnly = true)
    public Optional<ProvaVidaDTO> obterDadosProvaVida(String identificador) {
        if (identificador == null || identificador.isBlank()) {
            return Optional.empty();
        }

        String termosLimpos = identificador.replaceAll("\\D", "");

        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(termosLimpos)
                .or(() -> pessoaRepository.findByNip(termosLimpos));

        if (pessoaOpt.isEmpty()) {
            log.warn("Nenhum registro encontrado para Prova de Vida com o identificador: {}", termosLimpos);
            return Optional.empty();
        }

        Pessoa pessoa = pessoaOpt.get();

        LocalDate dtUltimo = parseData(pessoa.getDtultrecadastramento());
        LocalDate dtProximo = parseData(pessoa.getDtproxrecadastramento());

        String situacao = "Regular";
        if (dtProximo != null && LocalDate.now().isAfter(dtProximo)) {
            situacao = "Atrasado";
        }

        Locale localePt = Locale.forLanguageTag("pt-BR");
        DateTimeFormatter fmtUltimo = DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy", localePt);
        DateTimeFormatter fmtProximo = DateTimeFormatter.ofPattern("MMMM 'de' yyyy", localePt);

        String ultRecadastramentoFormatado = (dtUltimo != null) ? dtUltimo.format(fmtUltimo) : "Não informado";
        String proxRecadastramentoFormatado = (dtProximo != null) ? dtProximo.format(fmtProximo) : "Não informado";

        return Optional.of(new ProvaVidaDTO(
            ultRecadastramentoFormatado,
            proxRecadastramentoFormatado,
            situacao
        ));
    }

    /**
     * Consulta os dados do Auxílio-Invalidez.
     */
    @Transactional(readOnly = true)
    public Optional<AuxilioInvalidezDTO> obterDadosAuxilioInvalidez(String identificador) {
        if (identificador == null || identificador.isBlank()) {
            return Optional.empty();
        }

        String termosLimpos = identificador.replaceAll("\\D", "");

        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(termosLimpos)
                .or(() -> pessoaRepository.findByNip(termosLimpos));

        if (pessoaOpt.isEmpty()) {
            log.warn("Nenhum registro encontrado para Auxílio Invalidez com o identificador: {}", termosLimpos);
            return Optional.empty();
        }

        Pessoa pessoa = pessoaOpt.get();
        String cpf = pessoa.getCpfpessoa();
        String nip = pessoa.getNip();

        List<Object[]> registrosAux = pessoaRepository.buscarAuxInvalidezPorCpfOuNip(cpf, nip);

        LocalDate dtUltima = null;

        if (registrosAux != null && !registrosAux.isEmpty()) {
            Object[] primeiroRegistro = registrosAux.get(0);
            if (primeiroRegistro != null && primeiroRegistro.length > 0) {
                for (Object col : primeiroRegistro) {
                    if (col != null) {
                        LocalDate d = parseData(col);
                        if (d != null) {
                            dtUltima = d;
                            break;
                        }
                    }
                }
            }
        }

        LocalDate dtProxima = (dtUltima != null) ? dtUltima.plusMonths(8) : null; 

        DateTimeFormatter fmtMesAno = DateTimeFormatter.ofPattern("MM/yyyy");

        String ultimaFormatada = (dtUltima != null) ? dtUltima.format(fmtMesAno) : "Não informado";
        String proximaFormatada = (dtProxima != null) ? dtProxima.format(fmtMesAno) : "Não informado";

        String situacao = "Regular";
        if (dtProxima != null && LocalDate.now().isAfter(dtProxima)) {
            situacao = "Pendente";
        }

        String mensagemSituacao = String.format("Situação: %s (último envio registrado em %s).", situacao, ultimaFormatada);

        return Optional.of(new AuxilioInvalidezDTO(
            ultimaFormatada,
            proximaFormatada,
            situacao,
            mensagemSituacao,
            true
        ));
    }

    /**
     * Consulta os dados de uma requisição tratando o resultado em array de Objetos.
     */
    @Transactional(readOnly = true)
    public Optional<RequisicaoDTO> obterDadosRequisicao(String nrRequisicao) {
        if (nrRequisicao == null || nrRequisicao.isBlank()) {
            return Optional.empty();
        }

        String nrBusca = nrRequisicao.trim();

        Optional<Object[]> requisicaoOpt = pessoaRepository.buscarRequisicaoPorNumero(nrBusca);

        if (requisicaoOpt.isEmpty()) {
            log.warn("Nenhuma requisição localizada no banco com o número/ID: {}", nrBusca);
            return Optional.empty();
        }

        Object obj = requisicaoOpt.get();
        Object[] reg;

        if (obj instanceof Object[] array && array.length == 1 && array[0] instanceof Object[] innerArray) {
            reg = innerArray;
        } else if (obj instanceof Object[] array) {
            reg = array;
        } else {
            reg = new Object[]{obj};
        }

        String numero = (reg.length > 0 && reg[0] != null) ? reg[0].toString().trim() : nrBusca;
        
        LocalDate dtRegistro = (reg.length > 1) ? parseData(reg[1]) : null;
        String dataFormatada = (dtRegistro != null) 
                ? dtRegistro.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) 
                : "Não informada";

        String statusDescricao = (reg.length > 2 && reg[2] != null) ? reg[2].toString().trim() : "Em análise";

        String solicitacao = "Requerimento"; 

        return Optional.of(new RequisicaoDTO(
            numero,
            solicitacao,
            dataFormatada,
            statusDescricao
        ));
    }

    // =========================================================================
    // MÉTODOS AUXILIARES PRIVADOS
    // =========================================================================

    private String descriptografarNome(Object idPessoa, String cryptoKey) {
        if (idPessoa == null) {
            return null;
        }
        try {
            return pessoaRepository.descriptografarNomePorId(String.valueOf(idPessoa), cryptoKey);
        } catch (Exception e) {
            log.error("Erro ao descriptografar nome para o ID {}: {}", idPessoa, e.getMessage());
            return null;
        }
    }

    private LocalDate parseData(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof LocalDate localDate) {
            return localDate;
        }
        if (obj instanceof java.sql.Date sqlDate) {
            return sqlDate.toLocalDate();
        }
        if (obj instanceof java.util.Date utilDate) {
            return new java.sql.Date(utilDate.getTime()).toLocalDate();
        }
        return parseData(obj.toString());
    }

    private LocalDate parseData(String dataStr) {
        if (dataStr == null || dataStr.isBlank() || "null".equalsIgnoreCase(dataStr)) {
            return null;
        }
        try {
            String limpa = dataStr.trim();
            if (limpa.contains(" ")) {
                limpa = limpa.split(" ")[0];
            }
            return LocalDate.parse(limpa);
        } catch (DateTimeParseException e) {
            try {
                return LocalDate.parse(dataStr.trim(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            } catch (Exception ex) {
                log.warn("Não foi possível converter a data: {}", dataStr);
                return null;
            }
        }
    }
}