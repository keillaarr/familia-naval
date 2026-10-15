package com.familianaval.api.module.ttc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familianaval.api.module.ttc.dto.ItemOpcaoDTO;
import com.familianaval.api.module.ttc.dto.SalvarTtcRequestDTO;
import com.familianaval.api.module.ttc.dto.TtcDadosUsuarioDTO;
import com.familianaval.api.module.ttc.service.TtcService;

@RestController
@RequestMapping("/ttc")
public class TtcController {

    private final TtcService ttcService;

    public TtcController(TtcService ttcService) {
        this.ttcService = ttcService;
    }

    @GetMapping("/usuario/{idPessoa}")
    public ResponseEntity<TtcDadosUsuarioDTO> obterDadosUsuario(@PathVariable Long idPessoa) {
        return ttcService.buscarDadosUsuario(idPessoa)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/salvar")
    public ResponseEntity<String> salvarCadastro(@RequestBody SalvarTtcRequestDTO dto) {
        try {
            String mensagem = ttcService.cadastrarOuAtualizarTtc(dto);
            return ResponseEntity.ok(mensagem);
        } catch (Exception e) {
            e.printStackTrace(); // <--- IMPRIME O ERRO COMPLETO NO TERMINAL DO JAVA
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
    }

    @PostMapping("/remover-publicacao/{idPessoa}")
    public ResponseEntity<String> removerPublicacao(@PathVariable Long idPessoa) {
        String mensagem = ttcService.removerPublicacao(idPessoa);
        return ResponseEntity.ok(mensagem);
    }

    @GetMapping("/distritos")
    public ResponseEntity<List<ItemOpcaoDTO>> listarDistritos() {
        return ResponseEntity.ok(ttcService.listarDistritos());
    }

    @GetMapping("/areas")
    public ResponseEntity<List<ItemOpcaoDTO>> listarAreas() {
        return ResponseEntity.ok(ttcService.listarAreas());
    }

    @GetMapping("/assuntos")
    public ResponseEntity<List<ItemOpcaoDTO>> listarAssuntos() {
        return ResponseEntity.ok(ttcService.listarAssuntos());
    }

    @GetMapping("/oms")
    public ResponseEntity<List<ItemOpcaoDTO>> listarOrganizacoesMilitares() {
        return ResponseEntity.ok(ttcService.listarOrganizacoesMilitares());
    }

    @GetMapping("/teste")
    public ResponseEntity<String> teste() {
        return ResponseEntity.ok("Controller funcionando!");
    }
}