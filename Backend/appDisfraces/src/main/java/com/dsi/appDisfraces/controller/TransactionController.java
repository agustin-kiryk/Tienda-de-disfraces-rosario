package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.LimitDTO;
import com.dsi.appDisfraces.dto.TotalsDTO;
import com.dsi.appDisfraces.dto.TransactionDTO;
import com.dsi.appDisfraces.dto.TransactionMonthTotalsDto;
import com.dsi.appDisfraces.dto.TransactionTotalsDto;
import com.dsi.appDisfraces.entity.TransactionEntity;
import com.dsi.appDisfraces.repository.ITransactionRepository;
import com.dsi.appDisfraces.service.ITransactionService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*")

public class TransactionController {

  @Autowired
  ITransactionService transactionService;


  @PostMapping("/newTransaction")
  ResponseEntity<TransactionDTO> createTransaction(@Valid @RequestBody TransactionDTO transactionDTO) {
    TransactionDTO result = transactionService.create(transactionDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

  @GetMapping("")
  ResponseEntity<List<TransactionDTO>> getAll() {
    List<TransactionDTO> transactions = transactionService.findAll();
    return ResponseEntity.ok(transactions);
  }

  @GetMapping("/{id}")
  ResponseEntity<TransactionDTO> transactionById(@PathVariable Long id) {
    TransactionDTO transaction = transactionService.getDetailById(id);
    return ResponseEntity.ok(transaction);
  }

  @GetMapping("/document/{documentNumber}")
  ResponseEntity<List<TransactionDTO>> transactionByDocumentNumber(@PathVariable String documentNumber) {
    List<TransactionDTO> transactions = transactionService.getDetailByDocumentNumber(documentNumber);
    return ResponseEntity.ok(transactions);
  }


  @GetMapping("/monthSelected")
  public ResponseEntity<TotalsDTO> getTotalFacturacion(
      @RequestParam(required = false) Integer month,
      @RequestParam(required = false) Integer year,
      @RequestParam(required = false) Integer day) {

    TotalsDTO result = transactionService.getTotalst(month);
    return ResponseEntity.ok(result);

  }

  @GetMapping("/totalsMain")
  public ResponseEntity<TotalsDTO> getTotalsPrincipal(){
    TotalsDTO totalsDTO = transactionService.getTotalsMain();
    return ResponseEntity.ok(totalsDTO);

  }




}
