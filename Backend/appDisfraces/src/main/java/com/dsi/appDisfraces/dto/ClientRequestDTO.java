package com.dsi.appDisfraces.dto;

import com.dsi.appDisfraces.enumeration.ClientStatus;
import lombok.Data;

@Data
public class ClientRequestDTO {

  private Long id;
  private String name;
  private String lastName;
  private String Adress;
  private String DocumentNumber;
  private String clientStatus;
  private ClientStatus status;
  private Byte image;

}
