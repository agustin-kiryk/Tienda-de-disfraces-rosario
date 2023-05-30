package com.dsi.appDisfraces.dto;

import com.dsi.appDisfraces.entity.ClientEntity;
import lombok.Data;

import java.util.List;

@Data
public class TransactionDetailDTO {
     private String product;
     private Long quantity;
     private Double totalUnitario;
     private Double totalProduct;

}
