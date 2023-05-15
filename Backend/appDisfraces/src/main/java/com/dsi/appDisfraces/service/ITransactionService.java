package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.*;

import java.util.List;

public interface ITransactionService {

  TransactionDTO create(TransactionDTO transactionDTO);

  String getCostumeNameById(Long id);

  List<TransactionDTO> findAll();

  List<TransactionDTO> findByMonth();

  TransactionDTO getDetailById(Long id);

  List<TransactionDTO> getDetailByDocumentNumber(String documentNumber);


  TotalsDTO getTotalst(Integer month);

  TotalsDTO getTotalsMain();

  TransactionSaleDTO createSale(TransactionSaleDTO transactionSaleDTO);
}
