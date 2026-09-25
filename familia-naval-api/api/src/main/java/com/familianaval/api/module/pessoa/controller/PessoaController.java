package com.familianaval.api.module.pessoa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
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
}