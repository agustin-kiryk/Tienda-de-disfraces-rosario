package com.dsi.appDisfraces.dto;

import com.dsi.appDisfraces.enumeration.CostumeStatus;
import lombok.Data;

@Data

public class CostumeTableDTO {
  private Long id;
  private String name;
  private String detail;
  private String clientRented;
  private String reservationDate;
  private String deadlineDate;
  private CostumeStatus costumeStatus;

}
