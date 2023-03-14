package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.service.IcostumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/costumes")
@CrossOrigin(origins = "*")


public class CostumeController {

  @Autowired
  IcostumeService costumeService;
  @Autowired
  ICostumeRepository costumeRepository;

  @PostMapping("/newCostume")
  public ResponseEntity<CostumeRequestDTO> createCostume(@RequestBody CostumeRequestDTO costumeDTO){
    CostumeRequestDTO result = this.costumeService.saveCostume(costumeDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }


}
