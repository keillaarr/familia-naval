package com.familianaval.api.module.inspsaude.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.familianaval.api.module.inspsaude.model.InspSaude;
import com.familianaval.api.module.inspsaude.service.InspSaudeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/inspsaude")
public class InspSaudeController {

    private final InspSaudeService inspSaudeService;

    public InspSaudeController(InspSaudeService inspSaudeService) {
        this.inspSaudeService = inspSaudeService;
    }

    @GetMapping
    public ResponseEntity<List<InspSaude>> listarTodos() {
        return ResponseEntity.ok(inspSaudeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InspSaude> buscarPorId(@PathVariable Integer id) {
        return inspSaudeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/nip/{nip}")
    public ResponseEntity<List<InspSaude>> buscarPorNip(@PathVariable Integer nip) {
        List<InspSaude> lista = inspSaudeService.buscarPorNip(nip);
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<InspSaude> criarRequerimento(@RequestBody InspSaude inspSaude) {
        InspSaude novoRequerimento = inspSaudeService.salvar(inspSaude);
        return ResponseEntity.ok(novoRequerimento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRequerimento(@PathVariable Integer id) {
        if (inspSaudeService.buscarPorId(id).isPresent()) {
            inspSaudeService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}