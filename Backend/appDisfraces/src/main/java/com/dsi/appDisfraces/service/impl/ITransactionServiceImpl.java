package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.TotalsDTO;
import com.dsi.appDisfraces.dto.TransactionDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.ConfigurationEntity;
import com.dsi.appDisfraces.entity.CostumeEntity;
import com.dsi.appDisfraces.entity.TransactionEntity;
import com.dsi.appDisfraces.enumeration.AmountStatus;
import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.dsi.appDisfraces.enumeration.CostumeStatus;
import com.dsi.appDisfraces.exception.IdNotFound;
import com.dsi.appDisfraces.exception.ParamNotFound;
import com.dsi.appDisfraces.mapper.TransactionMapper;
import com.dsi.appDisfraces.repository.IClientRepository;
import com.dsi.appDisfraces.repository.IConfigurattionRepository;
import com.dsi.appDisfraces.repository.ICostumeRepository;
import com.dsi.appDisfraces.repository.ITransactionRepository;
import com.dsi.appDisfraces.service.ITransactionService;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  IConfigurattionRepository configurattionRepository;

  @Override
  public String getCostumeNameById(Long id) {
    CostumeEntity costume = costumeRepository.findById(id).orElse(null);
    return costume != null ? costume.getName() : null;
  }

  @Override
  public List<TransactionDTO> findAll() {
    List<TransactionEntity> transactions = transactionRepository.findAll();
    List<TransactionDTO> result = transactionMapper.transactionEntityList2DTOList(transactions);
    return result;
  }


 @Override
 public List<TransactionDTO> findByMonth() {
   List<TransactionEntity> transactions = transactionRepository.findAll();
   List<TransactionDTO> result = transactions.stream()
       .filter(transaction -> {
         LocalDate currentDate = LocalDate.now();
         LocalDate transactionDate = transaction.getDate();
         return transactionDate != null && Objects.nonNull(transactionDate.getMonth()) && transactionDate.getMonth() == currentDate.getMonth() && transactionDate.getYear() == currentDate.getYear();
       })
       .map(transactionMapper::transactionEntityToDTO)
       .collect(Collectors.toList());
   return result;
 }



  @Override
  public TransactionDTO getDetailById(Long id) {
    TransactionEntity transaction = transactionRepository.findById(id).orElseThrow(
        ()->new IdNotFound("El id "+id+" no se encntra en la base de datos"));
    TransactionDTO result = transactionMapper.transactionEntityToDTO(transaction);
    return result;
  }

  @Override
  public List<TransactionDTO> getDetailByDocumentNumber(String documentNumber) {
    List<TransactionEntity> transactions = transactionRepository.findByClientDocumentNumber(documentNumber).orElseThrow(
        ()-> new ParamNotFound("El número de documento " + documentNumber + " no se encuentra en la base de datos."));
    List<TransactionDTO> result = transactionMapper.transactionEntityList2DTOList(transactions);
    return result;
  }


  @Override
  public TotalsDTO getTotalst(Integer month) {

    TotalsDTO totalsDTO = new TotalsDTO();
    List<TransactionEntity> transactions = transactionRepository.findAll();
    Double totalAmounts = transactions.stream()
        .mapToDouble(TransactionEntity::getAmmount)
        .sum();
    Double totalMonth = transactions.stream()
        .filter(t -> t.getRentDate().getMonth() == LocalDate.now().getMonth())
        .mapToDouble(TransactionEntity::getAmmount)
        .sum();
    Double totalYear = transactions.stream().filter(t->t.getRentDate().getYear()==LocalDate.now().getYear())
        .mapToDouble(TransactionEntity::getAmmount)
        .sum();

    if (month != null) {
      Double totalSelectMonth = transactions.stream()
          .filter(t -> t.getRentDate().getMonthValue() == month
              && t.getRentDate().getYear() == LocalDate.now().getYear())
          .mapToDouble(TransactionEntity::getAmmount)
          .sum();
      totalsDTO.setSelectMonth(totalSelectMonth);

      Double totalSelectMonthPending = transactions.stream()
          .filter(t -> t.getPending() != null &&  t.getRentDate().getMonthValue() == month
              && t.getRentDate().getYear() == LocalDate.now().getYear() )
          .mapToDouble(TransactionEntity::getPending)
          .sum();
      totalsDTO.setSelectMonthPending2(totalSelectMonthPending);

      Double totalSelectMonthPaid = transactions.stream()
          .filter(t -> t.getPartialPayment() != null &&  t.getRentDate().getMonthValue() == month
              && t.getRentDate().getYear() == LocalDate.now().getYear() )
          .mapToDouble(TransactionEntity::getPartialPayment)
          .sum();
      totalsDTO.setSelectMonthPaid2(totalSelectMonthPaid);
    }

    totalsDTO.setTotals(totalAmounts);
    totalsDTO.setCurrentMonth(totalMonth);
    totalsDTO.setCurrentYear(totalYear);

    return totalsDTO;
  }

  @Override
  public TotalsDTO getTotalsMain() {

    TotalsDTO totalsDTO = new TotalsDTO();
    ConfigurationEntity configurationEntity = configurattionRepository.findFirstByOrderByIdAsc();
    Double billingLimit = configurationEntity.getBillingLimit();

    List<TransactionEntity> transactions = transactionRepository.findAll();
    Double totalMonthCurrent = transactions.stream()
        .filter(t -> t.getRentDate().getMonth() == LocalDate.now().getMonth())
        .mapToDouble(TransactionEntity::getAmmount)
        .sum();
    Double totalMonthPending = transactions.stream()
        .filter(t -> t.getPending() != null && t.getRentDate().getMonth() == LocalDate.now().getMonth())
        .mapToDouble(TransactionEntity::getPending)
        .sum();
    Double totalMonthPartial = transactions.stream()
        .filter(t -> t.getPartialPayment() != null &&   t.getRentDate().getMonth() == LocalDate.now().getMonth())
        .mapToDouble(TransactionEntity::getPartialPayment)
        .sum();

    Double totalmonthElectronic = transactions.stream()
        .filter(t -> t.getType().equals("factura electronica") && t.getRentDate().getMonth() == LocalDate.now().getMonth())
        .mapToDouble(TransactionEntity::getAmmount)
        .sum();
    totalsDTO.setTotalElectronic(totalmonthElectronic);
    totalsDTO.setTotals(totalMonthCurrent);
    totalsDTO.setSelectMonthPending2(totalMonthPending);
    totalsDTO.setSelectMonthPaid2(totalMonthPartial);
    totalsDTO.setRest(billingLimit-totalmonthElectronic);
    totalsDTO.setLimit(billingLimit);
    return totalsDTO;
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
    transactionEntity.setBillPayment(transactionDTO.getCheckIn());
    transactionEntity.setType(transactionDTO.getType());
    transactionEntity.setComplete(false);
    transactionEntity.setAmmount(transactionDTO.getAmount());
    transactionEntity.setPartialPayment(transactionDTO.getPartialPayment());
    transactionEntity.setDate(LocalDate.now());
    transactionEntity.setLimit(transactionDTO.getLimit());
    if (transactionDTO.getPartialPayment()==null||transactionDTO.getPartialPayment()==0) {
      transactionEntity.setPending(0.0);
    }else {transactionEntity.setPending(transactionDTO.getAmount() - transactionDTO.getPartialPayment());
    }
    if (transactionEntity.getPending()==0){
      transactionEntity.setPartialPayment(0.0);
      transactionEntity.setStatus(AmountStatus.APROVE);
    }
    if(transactionEntity.getPending()!=0){
      transactionEntity.setStatus(AmountStatus.PENDING);
    }
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
    result.setPartialPayment(transactionEntity.getPartialPayment());
    result.setPending(transactionEntity.getPending());
    result.setStatusPayment(String.valueOf(transactionEntity.getStatus()));

    return result;
  }
}
/*transaccion estados de pago aprove , pending , partial

if(pagostate.aprove){
 (transaction.getamount)=+ totalAmount
}

AGREGAR BOTON QUE DIGA MONTO 1000 / PAGO PARCIAL 600 / PENDIENTE 400

AGREGAR FUNCION EN FRONT QUE RESUELVA LA LOGICA DEL MONTO CON LOS PARCIALES, QUE VERIFIQUE ANTES DE ENVIAR LOS DATOS
QUE EL PARCIAL Y EL PENDIENTE SUMEN EL TOTAL, SI ES QUE SON DIFERENTES DE NULL


 */