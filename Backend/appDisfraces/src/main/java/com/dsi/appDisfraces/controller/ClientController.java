package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import com.dsi.appDisfraces.dto.ClientTableDto;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.service.IClientService;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {
  @Autowired
  private IClientService clientService;
  @Autowired
  private IClientRepository clientRepository;

  //public ClientController(IClientService clientService) {
  //  this.clientService = clientService;
  //}

  @PostMapping("/newClient")
  public ResponseEntity<ClientRequestDTO> createClient(@RequestBody ClientRequestDTO dto){

    ClientRequestDTO result = this.clientService.save(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClientRequestDTO> getclient(@PathVariable Long id){
    ClientRequestDTO client = this.clientService.getDetailsById(id);
    return ResponseEntity.ok(client);
  }

  @GetMapping
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

  }


