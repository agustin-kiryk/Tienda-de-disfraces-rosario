package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.CostumeDetailDTO;
import com.dsi.appDisfraces.dto.CostumeRequestDTO;

public interface IcostumeService {

  CostumeRequestDTO saveCostume(CostumeRequestDTO costumeDTO);

  CostumeDetailDTO getDetailsById(Long id);
}
