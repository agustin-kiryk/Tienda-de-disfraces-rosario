package com.dsi.appDisfraces.repository;

import com.dsi.appDisfraces.entity.TransactionEntity;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<TransactionEntity,Long> {

  TransactionEntity findTransactionsByDisfracesId(Long costumeId);

  List<TransactionEntity> findAllByDisfracesId(Long costumeId);

  @Query("SELECT t FROM TransactionEntity t WHERE :costumeId MEMBER OF t.disfraces AND ((t.rentDate >= :startDate AND t.rentDate <= :endDate) OR (t.deadline >= :startDate AND t.deadline <= :endDate) OR (t.rentDate <= :startDate AND t.deadline >= :endDate))")
  List<TransactionEntity> findOverlappingTransactions(@Param("costumeId") Long costumeId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

  @Query("SELECT count(t) FROM TransactionEntity t WHERE :costumeId MEMBER OF t.disfraces AND ((t.rentDate >= :startDate AND t.rentDate <= :endDate) OR (t.deadline >= :startDate AND t.deadline <= :endDate) OR (t.rentDate <= :startDate AND t.deadline >= :endDate))")
  Long countOverlappingTransactions(@Param("costumeId") Long costumeId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
