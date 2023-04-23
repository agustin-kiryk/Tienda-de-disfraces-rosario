package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.LimitDTO;
import com.dsi.appDisfraces.service.IConfigurationService;
import com.dsi.appDisfraces.service.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/configs")
@CrossOrigin(origins = "*")

public class ConfigController {

  @Autowired
  IConfigurationService configurationService;

  @PostMapping("/limit")
  public ResponseEntity<LimitDTO> limit(@RequestBody LimitDTO limitFDTO){
    LimitDTO limitDTO = this.configurationService.postLimit(limitFDTO);
    return ResponseEntity.ok(limitDTO);
  }

}
