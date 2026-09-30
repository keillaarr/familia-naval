package com.familianaval.api.module.cidade.service;

import com.familianaval.api.module.cidade.model.Cidade;
import com.familianaval.api.module.cidade.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public List<String> listarUfs() {
        return cidadeRepository.findAllUfs();
    }

    public List<Cidade> listarCidadesPorUf(String uf) {
        return cidadeRepository.findBySiglaufOrderByNomecidadeAsc(uf.toUpperCase());
    }
}