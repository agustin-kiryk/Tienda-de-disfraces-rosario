package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.TransactionDTO;

public interface ITransactionService {

  TransactionDTO create(TransactionDTO transactionDTO);

  String getCostumeNameById(Long id);
}
