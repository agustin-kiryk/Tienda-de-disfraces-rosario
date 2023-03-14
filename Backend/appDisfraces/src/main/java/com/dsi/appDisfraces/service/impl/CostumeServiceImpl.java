package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.mapper.CostumeMapper;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.service.IcostumeService;
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
}
