package com.familianaval.api.module.endereco.dto;

public class EnderecoResponseDTO {

    private String nome;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String siglaUf;
    private String cep;
    private String telefone;
    private String celular;
    private String email;

    // 1. Construtor vazio obrigatório
    public EnderecoResponseDTO() {
    }

    // 2. Construtor com parâmetros (caso utilize em JPQL/SQL nativo)
    public EnderecoResponseDTO(String nome, String logradouro, String numero, 
                               String complemento, String bairro, String cidade, 
                               String siglaUf, String cep, String telefone, 
                               String celular, String email) {
        this.nome = nome;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.siglaUf = siglaUf;
        this.cep = cep;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
    }

    // 3. Getters e Setters exatos esperados pelo EnderecoService
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getLogradouro() { return logradouro; }
    public void setLogradouro(String logradouro) { this.logradouro = logradouro; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getComplemento() { return complemento; }
    public void setComplemento(String complemento) { this.complemento = complemento; }

    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getSiglaUf() { return siglaUf; }
    public void setSiglaUf(String siglaUf) { this.siglaUf = siglaUf; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}