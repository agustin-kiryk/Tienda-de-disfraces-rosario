package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.CostumeDTO;
import com.dsi.appDisfraces.dto.CostumeDetailDTO;
import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.dsi.appDisfraces.enumeration.CustomeStatus;
import java.util.Comparator;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class CostumeMapper {

  public CostumeEntity costumeDTO2Entity(CostumeRequestDTO dto) {
    CostumeEntity entity = new CostumeEntity();
    entity.setName(dto.getName());
    entity.setDetail(dto.getDetail());
    entity.setColour(dto.getColour());
    entity.setImage(dto.getImage());
    entity.setCreationDate(new Date());

    return entity;
  }


  public CostumeRequestDTO costumeEntity2DTO(CostumeEntity entitysaved) {
    CostumeRequestDTO dto = new CostumeRequestDTO();
    dto.setId(entitysaved.getId());
    dto.setName(entitysaved.getName());
    dto.setDetail(entitysaved.getDetail());
    dto.setColour(entitysaved.getColour());
    dto.setImage(entitysaved.getImage());
    dto.setCreationDay(String.valueOf(entitysaved.getCreationDate()));
    dto.setStatus(String.valueOf(entitysaved.getStatus()));

    return dto;
  }

  public CostumeDetailDTO costumeDetailEntity2DTO(CostumeEntity entity) {
    CostumeDetailDTO dto = new CostumeDetailDTO();
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setDetail(entity.getDetail());
    dto.setImage(entity.getImage());
    dto.setColour(entity.getColour());
    dto.setStatus(String.valueOf(entity.getStatus()));
    dto.setCreationDay(String.valueOf(entity.getCreationDate()));
    if (!entity.getClients().isEmpty()){
    ClientEntity lastClient = entity.getClients().stream()
        .max(Comparator.comparing(ClientEntity::getLastRentedDate))
        .orElseThrow(NoSuchElementException::new);
    dto.setLastClientRented(lastClient.getName());}
    else {dto.setLastClientRented("Este disfraz todavia no se alquiló");}

    return dto;
  }
}
