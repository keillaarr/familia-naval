package com.familianaval.api.module.endereco.controller;

import com.familianaval.api.module.endereco.dto.EnderecoResponseDTO;
import com.familianaval.api.module.endereco.dto.EnderecoUpdateDTO;
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

    // 1. READ: Buscar por CPF usando PathVariable
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<EnderecoResponseDTO> buscarPorCpf(@PathVariable String cpf) {
        EnderecoResponseDTO dto = enderecoService.buscarPorCpf(cpf);
        
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 2. READ: Buscar por ID da Pessoa
    @GetMapping("/pessoa/{idPessoa}")
    public ResponseEntity<Endereco> buscarPorIdPessoa(@PathVariable String idPessoa) {
        Optional<Endereco> endereco = enderecoService.buscarPorIdPessoa(idPessoa);
        return endereco.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. CREATE / UPDATE: Salvar ou Atualizar usando o CPF na URL (compatível com o front-end)
    @PutMapping("/cpf/{cpf}")
    public ResponseEntity<Endereco> salvarOuAtualizarPorCpf(@PathVariable String cpf, @RequestBody EnderecoUpdateDTO novosDados) {
        try {
            // Reaproveita perfeitamente o método existente no seu Service que resolve o CPF para ID
            Endereco enderecoSalvo = enderecoService.salvarOuAtualizar(cpf, novosDados);
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
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}