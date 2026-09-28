package com.familianaval.api.module.inspsaude.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.familianaval.api.module.inspsaude.model.InspSaude;

@Repository
public interface InspSaudeRepository extends JpaRepository<InspSaude, Integer> {
    List<InspSaude> findByNip(Integer nip);
}