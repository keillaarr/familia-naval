package com.familianaval.api.module.dacp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.familianaval.api.module.dacp.dto.AcumulacaoCargosDTO;
import com.familianaval.api.module.dacp.service.DacpService;

@RestController
@RequestMapping("/api/v1/dacp")
@CrossOrigin(origins = "*")
public class DacpController {

    private final DacpService dacpService;

    public DacpController(DacpService dacpService) {
        this.dacpService = dacpService;
    }

    @GetMapping("/verificar-status")
    public ResponseEntity<Boolean> verificarStatus(@RequestParam String cpf) {
        boolean jaDeclarou = dacpService.verificarDeclaracaoAnoVigente(cpf);
        return ResponseEntity.ok(jaDeclarou);
    }

    @PostMapping("/salvar")
    public ResponseEntity<Void> salvar(@RequestBody AcumulacaoCargosDTO dto) {
        dacpService.salvarDeclaracao(dto);
        return ResponseEntity.ok().build();
    }
}