package com.familianaval.api.module.dacp.repository;

import com.familianaval.api.module.dacp.model.Proventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProventosRepository extends JpaRepository<Proventos, Long> {
}