package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.LimitDTO;
import com.dsi.appDisfraces.entity.ConfigurationEntity;
import com.dsi.appDisfraces.repository.IConfigurattionRepository;
import com.dsi.appDisfraces.service.IConfigurationService;
import com.dsi.appDisfraces.service.ITransactionService;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/configs")
@CrossOrigin(origins = "*")

public class ConfigController {

  @Autowired
  IConfigurationService configurationService;
  @Autowired
  IConfigurattionRepository configurattionRepository;

  @PostMapping("/limit")
  public ResponseEntity<LimitDTO> limit(@RequestBody LimitDTO limitFDTO){
    LimitDTO limitDTO = this.configurationService.postLimit(limitFDTO);
    return ResponseEntity.ok(limitDTO);
  }
  @GetMapping("/limite")
  public Double obtenerLimiteFacturacion() {
    ConfigurationEntity limit = configurattionRepository.findAll().stream().findFirst()
        .orElseThrow(() -> new NoSuchElementException("No se ha establecido el límite de facturación"));
    return limit.getBillingLimit();
  }

  @PutMapping("/limite")
  public void actualizarLimiteFacturacion(@RequestParam("limite") Double nuevoLimite) {
    ConfigurationEntity limit = configurattionRepository.findAll().stream().findFirst()
        .orElseThrow(() -> new NoSuchElementException("No se ha establecido el límite de facturación"));
    limit.setBillingLimit(nuevoLimite);
    configurattionRepository.save(limit);
  }

}
