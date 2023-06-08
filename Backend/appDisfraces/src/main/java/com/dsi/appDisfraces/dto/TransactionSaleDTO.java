package com.dsi.appDisfraces.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TransactionSaleDTO {

    private Long id;
  //  @NotEmpty(message = "the field amount it cant be empty")
    private Double amount;
    //private Long quantity;
    private String type;
    private Long clientId;
    private List<TransactionProductDTO> products;
    //private List<Long> productsIds;
  //  private List<String> names;
    private String checkIn;
    private String StatusPayment;
    private String clientName;
    private String clientLastName;
    private List<TransactionDetailDTO> transactionDetails;
    private String billPayment;
    private String clientAdress;
    private String clientDocument;
    private String clientPhone;



}
