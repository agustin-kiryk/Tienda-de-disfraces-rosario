package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.CostumeDetailDTO;
import com.dsi.appDisfraces.dto.CostumeRequestDTO;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.service.IcostumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        //trae disfraz con el ultimo cliente que lo alquilo si es que esta alquilado
  @GetMapping("/{id}")
  public ResponseEntity<CostumeDetailDTO> getcostume(@PathVariable Long id){
    CostumeDetailDTO client = this.costumeService.getDetailsById(id);
    return ResponseEntity.ok(client);
  }

  /*@GetMapping
  public ResponseEntity<List<ClientTableDto>> getAllClients(){
    List<ClientTableDto> clients = this.clientService.findAll();
    return ResponseEntity.ok().body(clients);

  }


  @PatchMapping("/{id}")
  public ResponseEntity<ClientRequestDTO> update(
       @PathVariable Long id, @RequestBody ClientRequestDTO personaje) {
    ClientRequestDTO result = this.clientService.update(id, personaje);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id){
    this.clientService.delete(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }*/


}
