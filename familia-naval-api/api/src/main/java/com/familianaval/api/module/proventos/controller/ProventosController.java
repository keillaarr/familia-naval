package com.familianaval.api.module.proventos.controller;

import com.familianaval.api.module.proventos.model.Proventos;
import com.familianaval.api.module.proventos.service.ProventosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/proventos")
public class ProventosController {

    @Autowired
    private ProventosService proventosService;

    @PostMapping
    public ResponseEntity<Proventos> salvar(@RequestBody Proventos proventos) {
        Proventos salvo = proventosService.salvarOuAtualizar(proventos);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Proventos> buscarPorCpf(@PathVariable String cpf) {
        Optional<Proventos> proventos = proventosService.buscarPorCpf(cpf);
        return proventos.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}