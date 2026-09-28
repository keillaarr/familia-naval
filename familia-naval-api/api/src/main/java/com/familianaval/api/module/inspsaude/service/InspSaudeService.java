package com.familianaval.api.module.inspsaude.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.familianaval.api.module.inspsaude.model.InspSaude;
import com.familianaval.api.module.inspsaude.repository.InspSaudeRepository;

@Service
public class InspSaudeService {

    private final InspSaudeRepository inspSaudeRepository;

    public InspSaudeService(InspSaudeRepository inspSaudeRepository) {
        this.inspSaudeRepository = inspSaudeRepository;
    }

    public List<InspSaude> listarTodos() {
        return inspSaudeRepository.findAll();
    }

    public Optional<InspSaude> buscarPorId(Integer id) {
        return inspSaudeRepository.findById(id);
    }

    public List<InspSaude> buscarPorNip(Integer nip) {
        return inspSaudeRepository.findByNip(nip);
    }

    public InspSaude salvar(InspSaude inspSaude) {
        return inspSaudeRepository.save(inspSaude);
    }

    public void eliminar(Integer id) {
        inspSaudeRepository.deleteById(id);
    }
}