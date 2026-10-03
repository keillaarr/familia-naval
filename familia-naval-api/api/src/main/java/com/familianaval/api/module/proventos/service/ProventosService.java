package com.familianaval.api.module.proventos.service;

import com.familianaval.api.module.proventos.model.Proventos;
import com.familianaval.api.module.proventos.repository.ProventosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProventosService {

    @Autowired
    private ProventosRepository proventosRepository;

    // Salvar ou Atualizar a declaração do usuário
    public Proventos salvarOuAtualizar(Proventos proventos) {
        return proventosRepository.save(proventos);
    }

    // Buscar declaração pelo CPF
    public Optional<Proventos> buscarPorCpf(String cpf) {
        return proventosRepository.findById(cpf);
    }
}