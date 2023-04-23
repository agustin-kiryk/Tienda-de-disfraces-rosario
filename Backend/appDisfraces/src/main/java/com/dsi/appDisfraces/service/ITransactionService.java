package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.LimitDTO;
import com.dsi.appDisfraces.dto.TotalsDTO;
import com.dsi.appDisfraces.dto.TransactionDTO;
import com.dsi.appDisfraces.dto.TransactionMonthTotalsDto;
import com.dsi.appDisfraces.dto.TransactionTotalsDto;
import java.util.List;

public interface ITransactionService {

  TransactionDTO create(TransactionDTO transactionDTO);

  String getCostumeNameById(Long id);

  List<TransactionDTO> findAll();

  TransactionDTO getDetailById(Long id);

  List<TransactionDTO> getDetailByDocumentNumber(String documentNumber);


  TotalsDTO getTotalst(Integer month);

  TotalsDTO getTotalsMain();

}
