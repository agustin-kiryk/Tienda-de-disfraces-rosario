package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.TransactionDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.entity.TransactionEntity;
import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.dsi.appDisfraces.enumeration.CostumeStatus;
import com.dsi.appDisfraces.exception.ParamNotFound;
import com.dsi.appDisfraces.mapper.TransactionMapper;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.repository.ITransactionRepository;
import com.dsi.appDisfraces.service.ITransactionService;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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
          ()->new ParamNotFound("No existe un disfraz con el ID  "+ "" +costumeId+ "" +" verifique nuevamente"));
      if (costume.getStatus() == CostumeStatus.ALQUILADO) {
        throw new ParamNotFound("el disfraz    "+costume.getName()+" ID   " +costumeId+ "    Ya se encuentra alquilado");
      }
      LocalDate reservationDate2 = costume.getReservationDate();
      LocalDate returnDate = transactionDTO.getDeadline();
      Set<TransactionEntity> currentTransaction = costume.getTransactions();
      costume.setTransactions(currentTransaction);

      if (currentTransaction == null || reservationDate2.isAfter(returnDate.minusDays(3))) {
        costumes.add(costume);

      }else throw new ParamNotFound("el disfraz"+costume.getName()+
          "   se encuentra reservado para la fecha seleccionada");

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
    //Actualizo el Status del disfraz y del cliente segun la fecha

    LocalDate reservationDate = transactionDTO.getReservationDate();//05/04
    LocalDate currentDate = LocalDate.now();//26/3
    if (currentDate.isBefore(reservationDate)) {
      costumes.forEach(costume -> {
        costume.setStatus(CostumeStatus.RESERVADO);
        costume.setReservationDate(transactionDTO.getReservationDate());
        costume.setDeadLine(transactionDTO.getDeadline());
        costumeRepository.save(costume);
        client.setClientStatus(ClientStatus.CON_RESERVA);
        client.setCustomes(costumes);
        clientRepository.save(client);
      });
    } else {
      costumes.forEach(costume -> {
        costume.setStatus(CostumeStatus.ALQUILADO);
        costume.setReservationDate(transactionDTO.getReservationDate());
        costume.setDeadLine(transactionDTO.getDeadline());
        costumeRepository.save(costume);
        client.setClientStatus(ClientStatus.ACTIVO);
        client.setCustomes(costumes);
        clientRepository.save(client);
      });
    }


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
