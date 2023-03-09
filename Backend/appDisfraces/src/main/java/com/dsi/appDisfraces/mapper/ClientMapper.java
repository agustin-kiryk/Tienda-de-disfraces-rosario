package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.dto.ClientTableDto;
import com.dsi.appDisfraces.dto.CostumeDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.dsi.appDisfraces.enumeration.CustomeStatus;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

  public ClientEntity clientDTO2Entity(ClientRequestDTO dto) {
    ClientEntity entity = new ClientEntity();
    entity.setName(dto.getName());
    entity.setLastName(dto.getLastName());
    entity.setAdress(dto.getAdress());
    entity.setDocumentNumber(dto.getDocumentNumber());
   //entity.setClientStatus(ClientStatus.valueOf(dto.getClientStatus()));
    entity.setImage(dto.getImage());
    entity.setType(dto.getType());
    entity.setPhone(dto.getPhone());

    return entity;
  }

  public ClientRequestDTO clientEntity2Dto(ClientEntity entity) {
    ClientRequestDTO dto = new ClientRequestDTO();
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setLastName(entity.getLastName());
    dto.setAdress(entity.getAdress());
    dto.setDocumentNumber(entity.getDocumentNumber());
    dto.setClientStatus(String.valueOf(entity.getClientStatus()));
    dto.setImage(entity.getImage());
    dto.setType(entity.getType());
    dto.setPhone(entity.getPhone());
    return dto;
  }

  public ClientTableDto clientBasicEntity2DTO(ClientEntity entity){
    ClientTableDto dto = new ClientTableDto();
    dto.setName(entity.getName());
    dto.setLastName(entity.getLastName());
    dto.setType(entity.getType());
    dto.setPhone(entity.getPhone());
    dto.setStatus(entity.getClientStatus());

    if(entity.getClientStatus().equals(ClientStatus.ACTIVO)){
      Optional<CostumeEntity> lastCostume = entity.getCustomes().stream()
          .filter(c -> c.getStatus() == CustomeStatus.ALQUILADO)
          .sorted(Comparator.comparing(CostumeEntity::getDeadLine).reversed()).findFirst();
      if (lastCostume.isPresent()){
        dto.setRentedCustome(String.valueOf(costumeEntity2DTO(lastCostume.get())));
      } else {
        dto.setRentedCustome("sin alquilar");
      }

    } else {
      dto.setRentedCustome("sin alquilar");
    }
    return dto;

  }

  public CostumeDTO costumeEntity2DTO(CostumeEntity entity) {
   CostumeDTO dto = new CostumeDTO();
   dto.setId(entity.getId());
   dto.setDeadLine(entity.getDeadLine());
   dto.setName(entity.getName());

    return dto;
  }



  public List<ClientTableDto> clientEntityList2DTOList(List<ClientEntity> entities) {
    List<ClientTableDto> dtos = new ArrayList<>();
    for (ClientEntity entity : entities){
      dtos.add(this.clientBasicEntity2DTO(entity));
    }
    return dtos;
  }
}
  /*public ClientTableDto clientBasicEntity2DTO(ClientEntity entity){
    ClientTableDto dto = new ClientTableDto();
    dto.setName(entity.getName());
    dto.setLastName(entity.getLastName());

    if (entity.isActive()) {
    Optional<Disfraz> lastCostume = entity.getCustomes().stream()
    .filter(c -> c.isRented())
    .sorted(Comparator.comparing(Disfraz::getRentDate).reversed())
    .findFirst();
    if (lastCostume.isPresent()) {
    dto.setRentedCustome(disfraz2DTO(lastCostume.get()));
    } else {
    dto.setRentedCustome(null);
    }
    } else {
    dto.setRentedCustome(null);
    }

    return dto;
    }*/
