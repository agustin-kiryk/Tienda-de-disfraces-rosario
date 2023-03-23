package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.dto.CostumeDetailDTO;
import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.dto.CostumeTableDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.exception.ParamNotFound;
import com.dsi.appDisfraces.mapper.CostumeMapper;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.service.IcostumeService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostumeServiceImpl implements IcostumeService {

  @Autowired
  CostumeMapper costumeMapper;
  @Autowired
  ICostumeRepository costumeRepository;

  @Override
  public CostumeRequestDTO saveCostume(CostumeRequestDTO costumeDTO) {
    CostumeEntity entity = this.costumeMapper.costumeDTO2Entity(costumeDTO);
    CostumeEntity entitysaved = this.costumeRepository.save(entity);
    CostumeRequestDTO result = this.costumeMapper.costumeEntity2DTO(entitysaved);
    return result;
  }

  @Override
  public CostumeDetailDTO getDetailsById(Long id) {
    CostumeEntity entity = this.costumeRepository.findById(id).orElseThrow(
        ()-> new ParamNotFound("El ID del disfraz no existe"));
    CostumeDetailDTO dto = costumeMapper.costumeDetailEntity2DTO(entity);
    return dto;
  }

  @Override
  public List<CostumeTableDTO> findAll() {
    List<CostumeEntity> entities = this.costumeRepository.findAll();
    List<CostumeTableDTO> dtos = this.costumeMapper.costumeTableEntityList2DTO(entities);
    return dtos;
  }

  @Override
  public CostumeRequestDTO update(Long id, CostumeRequestDTO newCostumeDTO) {
    CostumeEntity entity = this.costumeRepository.findById(id).orElseThrow(
        ()-> new IllegalArgumentException("El id del disfraz es invalido"));
    this.costumeMapper.costumeUpdateEntity2DTO(entity, newCostumeDTO);
    CostumeEntity updateEntity = this.costumeRepository.save(entity);
    CostumeRequestDTO result = costumeMapper.costumeEntity2DTO(updateEntity);

    return result;
  }

  @Override
  public void delete(Long id) {
    CostumeEntity entity = this.costumeRepository.findById(id).orElseThrow(
        ()-> new ParamNotFound("El id del disfraz es invalido"));
    this.costumeRepository.deleteById(id);
  }

}

