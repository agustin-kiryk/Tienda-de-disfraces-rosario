package com.dsi.appDisfraces.repository;

import com.dsi.appDisfraces.entity.TransactionEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<TransactionEntity,Long> {

  TransactionEntity findTransactionsByDisfracesId(Long costumeId);

  List<TransactionEntity> findAllByDisfracesId(Long costumeId);

  Optional<List<TransactionEntity>> findByClientDocumentNumber(String documentNumber);

}
