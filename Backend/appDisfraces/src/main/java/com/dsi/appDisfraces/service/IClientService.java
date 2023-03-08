package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.ClientRequestDTO;
import java.io.IOException;

public interface IClientService {

  ClientRequestDTO save(ClientRequestDTO clientRequestDTO);

  ClientRequestDTO getDetailsById(Long id);
}
