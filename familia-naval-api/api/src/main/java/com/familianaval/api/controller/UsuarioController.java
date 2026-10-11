package com.familianaval.api.controller;

import com.familianaval.api.config.SecurityUtils;
import com.familianaval.api.module.pessoa.model.Pessoa;
import com.familianaval.api.module.pessoa.repository.PessoaRepository;
import com.familianaval.api.module.vinculo.model.Vinculo;
import com.familianaval.api.module.vinculo.service.VinculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private VinculoService vinculoService;

    @GetMapping("/logado")
    public ResponseEntity<Map<String, Object>> getUsuarioLogado(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> resposta = new HashMap<>();

        // 1. Obtém o CPF atual (Mock local ou Gov.br)
        String cpfAtual = SecurityUtils.getCpfLogado();
        System.out.println("=== [DEBUG] CPF Obtido pelo SecurityUtils: " + cpfAtual);
        resposta.put("cpf", cpfAtual);

        // 2. Busca os dados da Pessoa no PostgreSQL pelo campo cpfpessoa
        Optional<Pessoa> pessoaOpt = pessoaRepository.findByCpfpessoa(cpfAtual);

        if (pessoaOpt.isPresent()) {
            Pessoa pessoa = pessoaOpt.get();
            System.out.println("=== [DEBUG] Pessoa encontrada: " + pessoa.getNomecpessoa() + " (ID: " + pessoa.getIdpessoa() + ")");
            
            resposta.put("idPessoa", pessoa.getIdpessoa());
            resposta.put("nome", pessoa.getNomecpessoa());
            resposta.put("nip", pessoa.getNip());
            resposta.put("siglaOm", pessoa.getSiglaom());

            // 3. Busca o Vínculo associado utilizando o idpessoa
            Optional<Vinculo> vinculoOpt = vinculoService.buscarPorIdPessoa(pessoa.getIdpessoa());
            
            if (vinculoOpt.isPresent()) {
                Vinculo vinculo = vinculoOpt.get();
                System.out.println("=== [DEBUG] Vínculo encontrado para o ID: " + pessoa.getIdpessoa());
                
                resposta.put("idVinculo", vinculo.getIdVinculo());
                resposta.put("matricula", vinculo.getMatricula());
                resposta.put("siglaPosto", vinculo.getSiglaPosto());
                resposta.put("idTipoPessoa", vinculo.getIdTipoPessoa());

                if (vinculo.getTipoPessoa() != null) {
                    resposta.put("tipoPessoaDescricao", vinculo.getTipoPessoa().getDescricao());
                }
            } else {
                System.out.println("=== [DEBUG] Nenhum vínculo encontrado para o ID Pessoa: " + pessoa.getIdpessoa());
            }
        } else {
            System.out.println("=== [DEBUG] ATENÇÃO: Nenhuma pessoa encontrada no banco para o CPF: " + cpfAtual);
            resposta.put("nome", principal != null ? principal.getAttribute("name") : "Usuário não cadastrado na base");
        }

        if (principal != null) {
            resposta.put("email", principal.getAttribute("email"));
            resposta.put("autenticadoGovBr", true);
        } else {
            resposta.put("email", "teste.local@marinha.mil.br");
            resposta.put("autenticadoGovBr", false);
        }

        return ResponseEntity.ok(resposta);
    }
}