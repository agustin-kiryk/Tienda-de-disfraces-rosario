package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.enumeration.ClientStatus;
import java.io.IOException;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

  public ClientEntity clientDTO2Entity(ClientRequestDTO dto) {
    ClientEntity entity = new ClientEntity();
    entity.setName(dto.getName());
    entity.setLastName(dto.getName());
    entity.setAdress(dto.getAdress());
    entity.setDocumentNumber(dto.getDocumentNumber());
  //  entity.setClientStatus(ClientStatus.valueOf(dto.getClientStatus()));
    entity.setImage(dto.getImage());

    return entity;
  }

  public ClientRequestDTO clientEntity2Dto(ClientEntity entity) {
    ClientRequestDTO dto = new ClientRequestDTO();
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setLastName(entity.getName());
    dto.setAdress(entity.getAdress());
    dto.setDocumentNumber(entity.getDocumentNumber());
   // dto.setClientStatus(String.valueOf(entity.getClientStatus()));
    dto.setImage(entity.getImage());
    return dto;
  }
}
