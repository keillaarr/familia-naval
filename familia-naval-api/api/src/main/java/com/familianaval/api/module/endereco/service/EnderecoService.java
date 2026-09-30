package com.familianaval.api.module.endereco.service;

import com.familianaval.api.module.cidade.model.Cidade;
import com.familianaval.api.module.endereco.dto.EnderecoResponseDTO;
import com.familianaval.api.module.endereco.dto.EnderecoUpdateDTO;
import com.familianaval.api.module.endereco.model.Endereco;
import com.familianaval.api.module.endereco.repository.EnderecoRepository;
import com.familianaval.api.module.pessoa.model.Pessoa;
import com.familianaval.api.module.pessoa.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Value("${app.crypto.key:bf}")
    private String cryptoKey;

    private String getDataAtualFormatada() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        return LocalDateTime.now().format(formatter);
    }

    private String limparELimitarCep(String cep) {
        if (cep != null) {
            String cepLimpo = cep.replaceAll("\\D", "");
            if (cepLimpo.length() > 8) {
                return cepLimpo.substring(0, 8);
            }
            return cepLimpo;
        }
        return null;
    }

    public Optional<Endereco> buscarPorIdPessoa(String idPessoa) {
        return enderecoRepository.findById(idPessoa);
    }

    public EnderecoResponseDTO buscarPorCpf(String cpf) {
        System.out.println("=== INÍCIO DA BUSCA POR CPF: [" + cpf + "] ===");

        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(cpf);
        
        if (pessoaOpt.isPresent()) {
            Pessoa pessoa = pessoaOpt.get();
            String idPessoa = pessoa.getIdpessoa(); 
            
            System.out.println("-> Pessoa encontrada com sucesso!");
            System.out.println("-> ID da Pessoa mapeado: [" + idPessoa + "]");
            
            Optional<Endereco> enderecoOpt = enderecoRepository.findById(idPessoa);
            
            if (enderecoOpt.isPresent()) {
                Endereco endereco = enderecoOpt.get();
                System.out.println("-> Endereço encontrado no banco para este ID!");

                EnderecoResponseDTO dto = new EnderecoResponseDTO();
                
                String nomeDescriptografado = null;
                try {
                    nomeDescriptografado = pessoaRepository.descriptografarNomePorId(idPessoa, cryptoKey);
                } catch (Exception e) {
                    System.out.println("-> Erro ao descriptografar nome: " + e.getMessage());
                }

                String nomeFinal = (nomeDescriptografado != null && !nomeDescriptografado.isBlank()) 
                        ? nomeDescriptografado 
                        : pessoa.getNomecpessoa();

                dto.setNome(nomeFinal); 
                dto.setLogradouro(endereco.getEnderecoRua());
                dto.setNumero(endereco.getEnderecoNumero());
                dto.setComplemento(endereco.getEnderecoComplemento());
                dto.setBairro(endereco.getEnderCoBairro());
                dto.setCep(endereco.getCep());
                dto.setTelefone(endereco.getTelefone1());
                dto.setCelular(endereco.getCelular());
                dto.setEmail(endereco.getEmail());
                
                if (endereco.getCidade() != null) {
                    Cidade cidadeObj = (Cidade) endereco.getCidade();
                    dto.setCidade(cidadeObj.getNomecidade());
                    dto.setSiglaUf(cidadeObj.getSiglauf());
                } else {
                    dto.setCidade(endereco.getCdCidade());
                }

                return dto;
            } else {
                System.out.println("-> ATENÇÃO: Pessoa encontrada, mas nenhum endereço cadastrado para o ID: [" + idPessoa + "]");
            }
        } else {
            System.out.println("-> ATENÇÃO: Nenhuma pessoa foi encontrada no banco com o CPF: [" + cpf + "]");
        }
        
        System.out.println("=== FIM DA BUSCA (RETORNANDO NULO) ===");
        return null;
    }

    public Endereco salvarOuAtualizar(String cpfOuIdPessoa, EnderecoUpdateDTO novosDados) {
        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(cpfOuIdPessoa);
        String idPessoa;

        if (pessoaOpt.isPresent()) {
            idPessoa = pessoaOpt.get().getIdpessoa();
            System.out.println("-> CPF resolvido para o ID da Pessoa: [" + idPessoa + "]");
        } else {
            idPessoa = cpfOuIdPessoa;
        }

        Optional<Endereco> enderecoExistenteOpt = enderecoRepository.findById(idPessoa);
        String dataAtual = getDataAtualFormatada();

        Endereco endereco;

        if (enderecoExistenteOpt.isPresent()) {
            endereco = enderecoExistenteOpt.get();

            boolean enderecoAlterado = 
                isDiferente(endereco.getEnderecoRua(), novosDados.getEnderecoRua()) ||
                isDiferente(endereco.getEnderecoNumero(), novosDados.getEnderecoNumero()) ||
                isDiferente(endereco.getEnderecoComplemento(), novosDados.getEnderecoComplemento()) ||
                isDiferente(endereco.getEnderCoBairro(), novosDados.getEnderCoBairro()) ||
                isDiferente(endereco.getCdCidade(), novosDados.getCdCidade()) ||
                isDiferente(endereco.getCep(), limparELimitarCep(novosDados.getCep())) ||
                isDiferente(endereco.getTelefone1(), novosDados.getTelefone1()) ||
                isDiferente(endereco.getCelular(), novosDados.getCelular());

            if (enderecoAlterado) {
                endereco.setDtAtualizacao(dataAtual);
            }

            if (isDiferente(endereco.getEmail(), novosDados.getEmail())) {
                endereco.setEmail(novosDados.getEmail());
                endereco.setDtAtualizacaoEmail(dataAtual);
            }

            endereco.setEnderecoRua(novosDados.getEnderecoRua());
            endereco.setEnderecoNumero(novosDados.getEnderecoNumero());
            endereco.setEnderecoComplemento(novosDados.getEnderecoComplemento());
            endereco.setEnderCoBairro(novosDados.getEnderCoBairro());
            endereco.setCdCidade(novosDados.getCdCidade()); // Atualiza com o código da cidade selecionada pelo front-end
            endereco.setCep(limparELimitarCep(novosDados.getCep()));
            endereco.setDddTel1(novosDados.getDddTel1());
            endereco.setTelefone1(novosDados.getTelefone1());
            endereco.setDddTel2(novosDados.getDddTel2());
            endereco.setTelefone2(novosDados.getTelefone2());
            endereco.setDddCelular(novosDados.getDddCelular());
            endereco.setCelular(novosDados.getCelular());

        } else {
            endereco = new Endereco();
            endereco.setIdPessoa(idPessoa);
            endereco.setEnderecoRua(novosDados.getEnderecoRua());
            endereco.setEnderecoNumero(novosDados.getEnderecoNumero());
            endereco.setEnderecoComplemento(novosDados.getEnderecoComplemento());
            endereco.setEnderCoBairro(novosDados.getEnderCoBairro());
            endereco.setCdCidade(novosDados.getCdCidade());
            endereco.setCep(limparELimitarCep(novosDados.getCep()));
            endereco.setDddTel1(novosDados.getDddTel1());
            endereco.setTelefone1(novosDados.getTelefone1());
            endereco.setDddTel2(novosDados.getDddTel2());
            endereco.setTelefone2(novosDados.getTelefone2());
            endereco.setDddCelular(novosDados.getDddCelular());
            endereco.setCelular(novosDados.getCelular());
            endereco.setEmail(novosDados.getEmail());
            endereco.setDtAtualizacao(dataAtual);
            
            if (novosDados.getEmail() != null && !novosDados.getEmail().isEmpty()) {
                endereco.setDtAtualizacaoEmail(dataAtual);
            }
        }

        return enderecoRepository.save(endereco);
    }

    private boolean isDiferente(String valorAntigo, String valorNovo) {
        if (valorAntigo == null) valorAntigo = "";
        if (valorNovo == null) valorNovo = "";
        return !valorAntigo.equals(valorNovo);
    }
}