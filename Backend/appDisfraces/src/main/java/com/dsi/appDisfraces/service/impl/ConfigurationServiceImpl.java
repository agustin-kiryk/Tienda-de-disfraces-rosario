package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.LimitDTO;
import com.dsi.appDisfraces.entity.ConfigurationEntity;
import com.dsi.appDisfraces.entity.TransactionEntity;
import com.dsi.appDisfraces.repository.IConfigurattionRepository;
import com.dsi.appDisfraces.service.IConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigurationServiceImpl implements IConfigurationService {

  @Autowired
  IConfigurattionRepository configurattionRepository;

  @Override
  public LimitDTO postLimit(LimitDTO limitFDTO) {

    ConfigurationEntity configuration = new ConfigurationEntity();
    configuration.setBillingLimit(limitFDTO.getLimit());
    configurattionRepository.save(configuration);

    LimitDTO dto = new LimitDTO();
    dto.setLimit(configuration.getBillingLimit());

    return dto;
  }

}
