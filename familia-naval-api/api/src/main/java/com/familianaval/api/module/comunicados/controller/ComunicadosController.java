package com.familianaval.api.module.comunicados.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familianaval.api.module.comunicados.model.Comunicados;
import com.familianaval.api.module.comunicados.repository.ComunicadosRepository;
import com.familianaval.api.module.comunicados.service.ComunicadosService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comunicados") // <-- Deixa apenas /comunicados aqui
public class ComunicadosController {

    private final ComunicadosService comunicadosService;

    public ComunicadosController(ComunicadosService comunicadosService) {
        this.comunicadosService = comunicadosService;
    }

    @GetMapping
    public ResponseEntity<List<Comunicados>> listarTodos() {
        return ResponseEntity.ok(comunicadosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comunicados> buscarPorId(@PathVariable Integer id) {
        return comunicadosService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{cpfUsuario}")
    public ResponseEntity<List<Comunicados>> buscarPorCpfUsuario(@PathVariable String cpfUsuario) {
        List<Comunicados> lista = comunicadosService.buscarPorCpfUsuario(cpfUsuario);
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<Comunicados> criarComunicado(@RequestBody Comunicados comunicado) {
        Comunicados novoComunicado = comunicadosService.salvar(comunicado);
        return ResponseEntity.ok(novoComunicado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarComunicado(@PathVariable Integer id) {
        if (comunicadosService.buscarPorId(id).isPresent()) {
            comunicadosService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

       @Autowired
        private ComunicadosRepository comunicadosRepository; // <--- Altere o nome do campo aqui

        @PutMapping("/{id}/ler")
        public ResponseEntity<Comunicados> marcarComoLido(@PathVariable Integer id) {
            return comunicadosRepository.findById(id) // Agora vai encontrar a variável corretamente!
                    .map(comunicado -> {
                        comunicado.setLido(1); // 1 para lido
                        Comunicados atualizado = comunicadosRepository.save(comunicado);
                        return ResponseEntity.ok(atualizado);
                    })
                    .orElse(ResponseEntity.notFound().build());
        }
}