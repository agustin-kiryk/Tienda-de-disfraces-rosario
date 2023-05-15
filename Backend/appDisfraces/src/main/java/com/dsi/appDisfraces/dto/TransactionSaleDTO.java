package com.dsi.appDisfraces.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TransactionSaleDTO {

    private Long id;
    private Double amount;
    private Long quantity;
    private String type;
    private Long clientId;
    private List<Long> productsIds;
    private List<String> names;
    private String checkIn;
    private String StatusPayment;
    private String clientName;
    private String clientLastName;

}
