package com.familianaval.api.module.endereco.service;

import com.familianaval.api.module.endereco.model.Endereco;
import com.familianaval.api.module.endereco.repository.EnderecoRepository;
import com.familianaval.api.module.pessoa.model.Pessoa;
import com.familianaval.api.module.pessoa.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    private String getDataAtualFormatada() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        return LocalDateTime.now().format(formatter);
    }

    // Função específica para sanitizar e limitar o CEP a 8 dígitos (respeitando o VARCHAR(8))
    private String limparELimitarCep(String cep) {
        if (cep != null) {
            String cepLimpo = cep.replaceAll("\\D", ""); // Remove tudo que não for número (ex: hífens)
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

    public Optional<Endereco> buscarPorCpf(String cpf) {
        System.out.println("=== INÍCIO DA BUSCA POR CPF: [" + cpf + "] ===");

        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(cpf);
        
        if (pessoaOpt.isPresent()) {
            Pessoa pessoa = pessoaOpt.get();
            String idPessoa = pessoa.getIdpessoa(); 
            
            System.out.println("-> Pessoa encontrada com sucesso!");
            System.out.println("-> ID da Pessoa mapeado: [" + idPessoa + "]");
            
            Optional<Endereco> enderecoOpt = enderecoRepository.findById(idPessoa);
            System.out.println("-> Endereço encontrado no banco para este ID? " + enderecoOpt.isPresent());
            
            return enderecoOpt;
        } else {
            System.out.println("-> ATENÇÃO: Nenhuma pessoa foi encontrada no banco com o CPF: [" + cpf + "]");
        }
        
        System.out.println("=== FIM DA BUSCA (RETORNANDO VAZIO) ===");
        return Optional.empty();
    }

    public Endereco salvarOuAtualizar(String cpfOuIdPessoa, Endereco novosDados) {
        // 1. Resolve o CPF para o ID da pessoa correto
        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(cpfOuIdPessoa);
        String idPessoa;

        if (pessoaOpt.isPresent()) {
            idPessoa = pessoaOpt.get().getIdpessoa();
            System.out.println("-> CPF resolvido para o ID da Pessoa: [" + idPessoa + "]");
        } else {
            idPessoa = cpfOuIdPessoa; // Caso já venha o ID diretamente
        }

        Optional<Endereco> enderecoExistenteOpt = enderecoRepository.findById(idPessoa);
        String dataAtual = getDataAtualFormatada();

        Endereco endereco;

        if (enderecoExistenteOpt.isPresent()) {
            endereco = enderecoExistenteOpt.get();

            // Verifica se os campos de endereço mudaram de forma independente
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

            // Verifica se o e-mail mudou de forma 100% independente do endereço
            if (isDiferente(endereco.getEmail(), novosDados.getEmail())) {
                endereco.setEmail(novosDados.getEmail());
                endereco.setDtAtualizacaoEmail(dataAtual); // Atualiza a data do e-mail apenas se o e-mail mudou
            }

            // Atualiza os demais campos do endereço
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

        } else {
            // Novo registro
            endereco = novosDados;
            endereco.setIdPessoa(idPessoa);
            endereco.setCep(limparELimitarCep(novosDados.getCep()));
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