package com.dsi.appDisfraces.dto;

import lombok.Data;

@Data
public class CostumeDetailDTO {

  private Long id;
  private String name;
  private String colour;
  private String detail;
  private String image;
  private String creationDay;
  private String status;
  private String lastClientRented;

}
