package com.dsi.appDisfraces.dto;

import com.dsi.appDisfraces.entity.ClientEntity;
import lombok.Data;

import java.util.List;

@Data
public class TransactionDetailDTO {
    private List<ClientEntity> clients;
}
