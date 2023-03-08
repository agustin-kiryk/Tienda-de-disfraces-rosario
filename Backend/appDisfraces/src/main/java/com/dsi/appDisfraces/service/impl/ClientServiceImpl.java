package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.exception.ParamNotFound;
import com.dsi.appDisfraces.mapper.ClientMapper;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.service.IClientService;
import java.io.IOException;
import java.util.Optional;
import javax.swing.text.html.parser.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements IClientService {
  @Autowired
  ClientMapper clientMapper;
  @Autowired
  IClientRepository clientRepository;

  @Override
  public ClientRequestDTO save(ClientRequestDTO dto){

    Optional<ClientEntity> entity = this.clientRepository.
        findByDocumentNumber(dto.getDocumentNumber());
    if (!entity.isPresent()){
      new ParamNotFound("usuario repetido");
    }
    ClientEntity entity2 = clientMapper.clientDTO2Entity(dto);
    ClientEntity entitySaved = clientRepository.save(entity2);
    ClientRequestDTO result = clientMapper.clientEntity2Dto(entitySaved);

    return result;
  }

  @Override
  public ClientRequestDTO getDetailsById(Long id) {
    ClientEntity entity = clientRepository.findById(id).orElseThrow(
        () -> new ParamNotFound("no se encuentra el id del cliente"));
    ClientRequestDTO clientDTO = this.clientMapper.clientEntity2Dto(entity);
    return clientDTO;
  }

}
