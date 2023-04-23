package com.dsi.appDisfraces.repository;

import com.dsi.appDisfraces.entity.ConfigurationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IConfigurattionRepository extends JpaRepository<ConfigurationEntity, Long> {

  ConfigurationEntity findFirstByOrderByIdAsc();

}
