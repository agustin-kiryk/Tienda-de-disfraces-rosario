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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

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
  @Autowired
  TransactionTemplate transactionTemplate;

  @Override
  public String getCostumeNameById(Long id) {
    CostumeEntity costume = costumeRepository.findById(id).orElse(null);
    return costume != null ? costume.getName() : null;
  }

  @Transactional
  @Override
  public TransactionDTO create(TransactionDTO transactionDTO) {
    ClientEntity client = clientRepository.findById(transactionDTO.getClientId())
        .orElseThrow(() -> new ParamNotFound("El id del cliente es invalido"));

    Set<CostumeEntity> costumes = new HashSet<>();

    for (Long costumeId : transactionDTO.getCostumeIds()) {
      CostumeEntity costume = costumeRepository.findById(costumeId)
          .orElseThrow(() -> new ParamNotFound("No existe un disfraz con el ID " + costumeId + ", verifique nuevamente"));

     /* if (costume.getStatus() == CostumeStatus.ALQUILADO) {
        throw new ParamNotFound("El disfraz " + costume.getName() + " con ID " + costumeId + " ya se encuentra alquilado.");
      }*/

      LocalDate returnDate = transactionDTO.getDeadline();

      List<TransactionEntity> transactions = transactionRepository.findAllByDisfracesId(costumeId);
      for (TransactionEntity transaction : transactions) {
        if (!transaction.getComplete()) {
          LocalDate reservationDate2 = transaction.getRentDate();
          if (reservationDate2 != null) {
            LocalDate deadline2 = transaction.getDeadline();
            if ((reservationDate2.isEqual(transactionDTO.getReservationDate()) || reservationDate2.isAfter(transactionDTO.getReservationDate())) && reservationDate2.isBefore(
                transactionDTO.getDeadline())) {
              throw new ParamNotFound("El disfraz " + costume.getName() + " con ID " + costumeId + " se encuentra reservado para la fecha seleccionada.");
            } else if (reservationDate2.isBefore(transactionDTO.getDeadline()) && deadline2.isAfter(transactionDTO.getReservationDate())) {
              throw new ParamNotFound("El disfraz " + costume.getName() + " con ID " + costumeId + " se encuentra reservado para la fecha seleccionada.");
            } else if (returnDate.equals(reservationDate2)) {
              throw new ParamNotFound("El disfraz " + costume.getName() + " con ID " + costumeId + " ya está reservado para la fecha seleccionada.");
            } else if ((reservationDate2.isBefore(returnDate.plusDays(1)) && reservationDate2.isAfter(returnDate.minusDays(3)))
                || (returnDate.isBefore(reservationDate2.plusDays(1)) && returnDate.isAfter(reservationDate2.minusDays(3)))) {
              throw new ParamNotFound("El disfraz " + costume.getName() + " con ID " + costumeId + " se encuentra reservado para la fecha seleccionada.");
            }
          }
        }


    }
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
    transactionEntity.setComplete(false);
    transactionRepository.save(transactionEntity);

    LocalDate reservationDate = transactionDTO.getReservationDate();
    LocalDate currentDate = LocalDate.now();

    costumes.forEach(costume -> {
      costume.setStatus(currentDate.isBefore(reservationDate) ? CostumeStatus.RESERVADO : CostumeStatus.ALQUILADO);
      costume.setReservationDate(transactionDTO.getReservationDate());
      costume.setDeadLine(transactionDTO.getDeadline());
      costumeRepository.save(costume);
    });

    client.setClientStatus(currentDate.isBefore(reservationDate) ? ClientStatus.CON_RESERVA : ClientStatus.ACTIVO);
    client.setCustomes(costumes);
    clientRepository.save(client);

    TransactionDTO result = new TransactionDTO();
    result.setId(transactionEntity.getId());
    result.setClientId(transactionEntity.getClient().getId());
    result.setCostumeIds(transactionEntity.getDisfraces().stream().map(CostumeEntity::getId).collect(Collectors.toList()));
    result.setNames(transactionEntity.getDisfraces().stream().map(costume -> getCostumeNameById(costume.getId())).collect(Collectors.toList()));
    result.setReservationDate(transactionEntity.getRentDate());
    result.setDeadline(transactionEntity.getDeadline());
    result.setType(transactionEntity.getType());
    result.setAmount(transactionEntity.getAmmount());
    result.setCheckIn(transactionEntity.getBillPayment());

    return result;
  }
}
