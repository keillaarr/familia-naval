package com.familianaval.api.module.vinculo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familianaval.api.module.vinculo.model.Vinculo;
import com.familianaval.api.module.vinculo.service.VinculoService;

@RestController
@RequestMapping("/vinculos")
@CrossOrigin(origins = "*")
public class VinculoController {

    @Autowired
    private VinculoService vinculoService;

    @GetMapping
    public ResponseEntity<List<Vinculo>> listarTodos() {
        List<Vinculo> vinculos = vinculoService.listarTodos();
        return ResponseEntity.ok(vinculos);
    }

    @GetMapping("/pessoa/{idPessoa}")
    public ResponseEntity<Vinculo> buscarPorPessoa(@PathVariable String idPessoa) {
        Optional<Vinculo> vinculo = vinculoService.buscarPorIdPessoa(idPessoa);
        return vinculo.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
}