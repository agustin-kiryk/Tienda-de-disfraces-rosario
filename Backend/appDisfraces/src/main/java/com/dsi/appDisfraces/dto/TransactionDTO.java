package com.dsi.appDisfraces.dto;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class TransactionDTO {

  private Long id;
  private Double amount;
  private String type;
  private Long clientId;
  private List<Long> costumeIds;
  private Date reservationDate;
  private Date deadline;
  private String checkIn;

}
