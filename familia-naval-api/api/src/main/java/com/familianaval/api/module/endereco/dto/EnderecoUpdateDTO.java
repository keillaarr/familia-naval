package com.familianaval.api.module.endereco.dto;

public class EnderecoUpdateDTO {
    private String enderecoRua;
    private String enderecoNumero;
    private String enderecoComplemento;
    private String enderCoBairro;
    private String cdCidade;
    private String cep;
    private String dddTel1;
    private String telefone1;
    private String dddTel2;
    private String telefone2;
    private String dddCelular;
    private String celular;
    private String email;

    // Getters e Setters
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
}