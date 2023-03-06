package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {
  @Autowired
  private IClientService clientService;

  public ClientController(IClientService clientService) {
    this.clientService = clientService;
  }

  @PostMapping("/newClient")
  public ResponseEntity<ClientRequestDTO> createClient(@RequestBody ClientRequestDTO clientRequestDTO){
    ClientRequestDTO result = this.clientService.save(clientRequestDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

}
