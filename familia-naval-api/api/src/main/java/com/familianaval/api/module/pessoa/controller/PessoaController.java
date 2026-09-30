package com.familianaval.api.module.pessoa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familianaval.api.module.dependente.model.Dependente;
import com.familianaval.api.module.dependente.repository.DependenteRepository;
import com.familianaval.api.module.inspsaude.dto.InspecaoSaudeRequestDTO;
import com.familianaval.api.module.pessoa.dto.AuxilioInvalidezDTO;
import com.familianaval.api.module.pessoa.dto.PessoaHomeDTO;
import com.familianaval.api.module.pessoa.dto.ProvaVidaDTO;
import com.familianaval.api.module.pessoa.dto.RequisicaoDTO;
import com.familianaval.api.module.pessoa.service.PessoaService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pessoa")
public class PessoaController {

    private final PessoaService pessoaService;
    private final DependenteRepository dependenteRepository; // 1. Declarar o repository

    // 2. Injetar ambos no construtor
    public PessoaController(PessoaService pessoaService, DependenteRepository dependenteRepository) {
        this.pessoaService = pessoaService;
        this.dependenteRepository = dependenteRepository;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/home/{identificador}")
    public ResponseEntity<PessoaHomeDTO> buscarDadosHomePorCpf(@PathVariable("identificador") String identificador) {
        return pessoaService.buscarDadosHomePorCpf(identificador)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/prova-vida/{cpf}")
    public ResponseEntity<ProvaVidaDTO> consultarProvaVida(@PathVariable("cpf") String cpf) {
        return pessoaService.obterDadosProvaVida(cpf)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/auxilio-invalidez/{identificador}")
    public ResponseEntity<AuxilioInvalidezDTO> obterAuxilioInvalidez(@PathVariable String identificador) {
        return pessoaService.obterDadosAuxilioInvalidez(identificador)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/requisicao/{nrRequisicao}")
    public ResponseEntity<RequisicaoDTO> obterRequisicao(@PathVariable String nrRequisicao) {
        return pessoaService.obterDadosRequisicao(nrRequisicao)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> registrarRequerimento(@RequestBody InspecaoSaudeRequestDTO request) {
        try {
            System.out.println("Recebido requerimento para o NIP: " + request.getNip());
            return ResponseEntity.ok("Requerimento registrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar requerimento.");
        }
    }

    @PostMapping("/inspsaude")
    public ResponseEntity<Void> registrarInspecaoSaude(@RequestBody InspecaoSaudeRequestDTO dto) {
        // Sua lógica de salvamento aqui
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dependentes/usuario/{nipTit}")
    public ResponseEntity<List<Dependente>> listarDependentesPorTitular(@PathVariable String nipTit) {
        try {
            // 3. Chamar o método usando a instância (minúsculo)
            List<Dependente> dependentes = dependenteRepository.findByNipTit(nipTit);
            return ResponseEntity.ok(dependentes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/teste-dependente")
        public ResponseEntity<String> testeDependente() {
            return ResponseEntity.ok("Rota de dependentes ativa!");
        }
}