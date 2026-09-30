package com.familianaval.api.module.endereco.controller;

import com.familianaval.api.module.endereco.model.Endereco;
import com.familianaval.api.module.endereco.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    // 1. READ: Buscar por CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<Endereco> buscarPorCpf(@PathVariable String cpf) {
        Optional<Endereco> endereco = enderecoService.buscarPorCpf(cpf);
        return endereco.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 2. READ: Buscar por ID da Pessoa
    @GetMapping("/pessoa/{idPessoa}")
    public ResponseEntity<Endereco> buscarPorIdPessoa(@PathVariable String idPessoa) {
        Optional<Endereco> endereco = enderecoService.buscarPorIdPessoa(idPessoa);
        return endereco.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. CREATE / UPDATE (Salvar ou Atualizar os dados do endereço da pessoa)
    @PutMapping("/{idPessoa}")
    public ResponseEntity<Endereco> salvarOuAtualizar(@PathVariable String idPessoa, @RequestBody Endereco novosDados) {
        try {
            Endereco enderecoSalvo = enderecoService.salvarOuAtualizar(idPessoa, novosDados);
            return ResponseEntity.ok(enderecoSalvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 4. DELETE: Remover endereço por ID da Pessoa (caso necessário no CRUD)
    @DeleteMapping("/{idPessoa}")
    public ResponseEntity<Void> deletar(@PathVariable String idPessoa) {
        Optional<Endereco> endereco = enderecoService.buscarPorIdPessoa(idPessoa);
        if (endereco.isPresent()) {
            // Se você tiver o método delete no service/repository, adicione aqui:
            // enderecoService.deletar(idPessoa);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}