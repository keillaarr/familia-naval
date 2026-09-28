package com.familianaval.api.module.comunicados.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.familianaval.api.module.comunicados.model.Comunicados;
import com.familianaval.api.module.comunicados.repository.ComunicadosRepository;

@Service
public class ComunicadosService {

    private final ComunicadosRepository comunicadosRepository;

    public ComunicadosService(ComunicadosRepository comunicadosRepository) {
        this.comunicadosRepository = comunicadosRepository;
    }

    public List<Comunicados> listarTodos() {
        return comunicadosRepository.findAll();
    }

    public Optional<Comunicados> buscarPorId(Integer id) {
        return comunicadosRepository.findById(id);
    }

    public List<Comunicados> buscarPorCpfUsuario(String cpfUsuario) {
        return comunicadosRepository.findByCpfUsuario(cpfUsuario);
    }

    public Comunicados salvar(Comunicados comunicado) {
        return comunicadosRepository.save(comunicado);
    }

    public void eliminar(Integer id) {
        comunicadosRepository.deleteById(id);
    }
}