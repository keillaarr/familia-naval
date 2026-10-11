package com.familianaval.api.module.vinculo.service;

import com.familianaval.api.module.vinculo.model.Vinculo;
import com.familianaval.api.module.vinculo.repository.VinculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VinculoService {

    @Autowired
    private VinculoRepository vinculoRepository;

    public Optional<Vinculo> buscarPorIdPessoa(String idPessoa) {
        return vinculoRepository.findByIdPessoa(idPessoa);
    }

    public List<Vinculo> listarTodos() {
        return vinculoRepository.findAll();
    }

}