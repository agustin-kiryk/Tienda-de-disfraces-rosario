package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.CostumeDTO;
import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.entity.CostumeEntity;
import java.util.Date;
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
}
