package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.TransactionDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.entity.TransactionEntity;
import com.dsi.appDisfraces.exception.ParamNotFound;
import com.dsi.appDisfraces.mapper.TransactionMapper;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.repository.ITransactionRepository;
import com.dsi.appDisfraces.service.ITransactionService;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

@Service
public class ITransactionServiceImpl implements ITransactionService {

  @Autowired
  ITransactionRepository transactionRepository;
  @Autowired
  IClientRepository clientRepository;
  @Autowired
  ICostumeRepository costumeRepository;
  @Autowired
  TransactionMapper transactionMapper;

  @Override
  public TransactionDTO create(TransactionDTO transactionDTO) {
    ClientEntity client = clientRepository.findById(transactionDTO.getClientId()).orElseThrow(
        ()-> new ParamNotFound("El id del cliente es invalido"));
    Set<CostumeEntity> costumes = new HashSet<>();
    for(Long costumeId : transactionDTO.getCostumeIds()){
      CostumeEntity costume = costumeRepository.findById(costumeId).orElseThrow(
          ()->new ParamNotFound("El Id"+costumeId+"del disfraz"));
      costumes.add(costume);
    }
    TransactionEntity transactionEntity = new TransactionEntity();
    transactionEntity.setClient(client);
    transactionEntity.setDisfraces(costumes);
    transactionEntity.setRentDate(transactionDTO.getReservationDate());
    transactionEntity.setDeadline(transactionDTO.getDeadline());
    transactionEntity.setAmmount(transactionDTO.getAmount());
    transactionEntity.setBillPayment(transactionDTO.getCheckIn());
    transactionEntity.setType(transactionDTO.getType());
    transactionRepository.save(transactionEntity);

    TransactionDTO result = new TransactionDTO();
    result.setId(transactionEntity.getId());
    result.setClientId(transactionEntity.getClient().getId());
    result.setCostumeIds(transactionEntity.getDisfraces().stream().map(CostumeEntity::getId).collect(
        Collectors.toList()));
    result.setReservationDate(transactionEntity.getRentDate());
    result.setDeadline(transactionEntity.getDeadline());
    result.setType(transactionEntity.getType());
    result.setAmount(transactionEntity.getAmmount());
    result.setCheckIn(transactionEntity.getBillPayment());

    return result ;
  }
}
