package com.familianaval.api.module.dacp.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.familianaval.api.module.dacp.dto.AcumulacaoCargosDTO;
import com.familianaval.api.module.dacp.model.Proventos;
import com.familianaval.api.module.dacp.repository.ProventosRepository;

@Service
public class DacpService {

    private final ProventosRepository proventosRepository;

    public DacpService(ProventosRepository proventosRepository) {
        this.proventosRepository = proventosRepository;
    }

    @Transactional
    public void salvarDeclaracao(AcumulacaoCargosDTO dto) {
        Proventos proventos = new Proventos();
        
        // Remove caracteres não numéricos do CPF antes de salvar
        String cpfLimpo = dto.cpf() != null ? dto.cpf().replaceAll("\\D", "") : "";
        proventos.setCpf(cpfLimpo);
        proventos.setSituacao(dto.situacao());
        
        if ("percebo".equalsIgnoreCase(dto.situacao())) {
            proventos.setOrgaopublico(dto.orgaopagador());
            proventos.setRemuneracao(dto.remuneracao());
        } else {
            proventos.setOrgaopublico(null);
            proventos.setRemuneracao(null);
        }
        
        proventos.setDthora(LocalDate.now());
        proventosRepository.save(proventos);
    }

    public boolean verificarDeclaracaoAnoVigente(String cpf) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}