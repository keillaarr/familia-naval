package com.familianaval.api.module.cidade.controller;

import com.familianaval.api.module.cidade.model.Cidade;
import com.familianaval.api.module.cidade.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cidades")
@CrossOrigin(origins = "*")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    // 1. GET /cidades/ufs -> Retorna a lista de estados (ex: ["BA", "RJ", "SP"])
    @GetMapping("/ufs")
    public ResponseEntity<List<String>> listarUfs() {
        List<String> ufs = cidadeService.listarUfs();
        return ResponseEntity.ok(ufs);
    }

    // 2. GET /cidades/uf/{siglaUf} -> Retorna as cidades daquele estado (ex: /cidades/uf/RJ)
    @GetMapping("/uf/{siglaUf}")
    public ResponseEntity<List<Cidade>> listarPorUf(@PathVariable String siglaUf) {
        List<Cidade> cidades = cidadeService.listarCidadesPorUf(siglaUf);
        return ResponseEntity.ok(cidades);
    }
}