package com.familianaval.api.module.endereco.model; // Ajuste para o seu pacote

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "endereco")
public class Endereco {

    @Id
    @Column(name = "idpessoa")
    private String idPessoa;

    @Column(name = "dtataulizacao")
    private String dtAtualizacao; // Nome mantido conforme o banco

    @Column(name = "enderecorua")
    private String enderecoRua;

    @Column(name = "endereconumero")
    private String enderecoNumero;

    @Column(name = "enderecocomplemento")
    private String enderecoComplemento;

    @Column(name = "endercobairro")
    private String enderCoBairro; // Nome mantido conforme o banco

    @Column(name = "cdcidade")
    private String cdCidade;

    @Column(name = "cep")
    private String cep;

    @Column(name = "dddtel1")
    private String dddTel1;

    @Column(name = "telefone1")
    private String telefone1;

    @Column(name = "dddtel2")
    private String dddTel2;

    @Column(name = "telefone2")
    private String telefone2;

    @Column(name = "dddcel")
    private String dddCelular;

    @Column(name = "celular")
    private String celular;

    @Column(name = "email")
    private String email;

    @Column(name = "dtatualizacaoemail")
    private String dtAtualizacaoEmail;

    // Getters e Setters
    public String getIdPessoa() { return idPessoa; }
    public void setIdPessoa(String idPessoa) { this.idPessoa = idPessoa; }

    public String getDtAtualizacao() { return dtAtualizacao; }
    public void setDtAtualizacao(String dtAtualizacao) { this.dtAtualizacao = dtAtualizacao; }

    public String getEnderecoRua() { return enderecoRua; }
    public void setEnderecoRua(String enderecoRua) { this.enderecoRua = enderecoRua; }

    public String getEnderecoNumero() { return enderecoNumero; }
    public void setEnderecoNumero(String enderecoNumero) { this.enderecoNumero = enderecoNumero; }

    public String getEnderecoComplemento() { return enderecoComplemento; }
    public void setEnderecoComplemento(String enderecoComplemento) { this.enderecoComplemento = enderecoComplemento; }

    public String getEnderCoBairro() { return enderCoBairro; }
    public void setEnderCoBairro(String enderCoBairro) { this.enderCoBairro = enderCoBairro; }

    public String getCdCidade() { return cdCidade; }
    public void setCdCidade(String cdCidade) { this.cdCidade = cdCidade; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getDddTel1() { return dddTel1; }
    public void setDddTel1(String dddTel1) { this.dddTel1 = dddTel1; }

    public String getTelefone1() { return telefone1; }
    public void setTelefone1(String telefone1) { this.telefone1 = telefone1; }

    public String getDddTel2() { return dddTel2; }
    public void setDddTel2(String dddTel2) { this.dddTel2 = dddTel2; }

    public String getTelefone2() { return telefone2; }
    public void setTelefone2(String telefone2) { this.telefone2 = telefone2; }

    public String getDddCelular() { return dddCelular; }
    public void setDddCelular(String dddCelular) { this.dddCelular = dddCelular; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDtAtualizacaoEmail() { return dtAtualizacaoEmail; }
    public void setDtAtualizacaoEmail(String dtAtualizacaoEmail) { this.dtAtualizacaoEmail = dtAtualizacaoEmail; }
}