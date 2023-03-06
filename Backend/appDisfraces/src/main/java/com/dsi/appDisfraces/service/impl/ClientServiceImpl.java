package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.mapper.ClientMapper;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements IClientService {
  @Autowired
  ClientMapper clientMapper;
  IClientRepository clientRepository;

  @Override
  public ClientRequestDTO save(ClientRequestDTO dto) {
    ClientEntity entity = clientMapper.clientDTO2Entity(dto);
    ClientEntity entitySaved = clientRepository.save(entity);
    ClientRequestDTO result = clientMapper.clientEntity2Dto(entitySaved);

    return result;
  }

}
