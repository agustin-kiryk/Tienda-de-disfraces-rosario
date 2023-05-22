package com.dsi.appDisfraces.entity;

import com.dsi.appDisfraces.enumeration.AmountStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Transacciones")
public class TransactionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "Cliente_id", referencedColumnName = "id")
  private ClientEntity client;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "Transaccion_Disfraz",
      joinColumns = @JoinColumn(name = "Transaccion_id"),
      inverseJoinColumns = @JoinColumn(name = "Disfraz_id")
  )
  private Set<CostumeEntity> disfraces = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "TRANSACCION_PRODUCTO",
      joinColumns = @JoinColumn(name = "TRANSACCION_ID"),
      inverseJoinColumns = @JoinColumn(name = "PRODUCTO_ID")
  )
  private Set<ProductEntity> products = new HashSet<>();

  @Column(name = "FECHA_DE_ALQUILER")
  private LocalDate rentDate;

  @Column(name = "FECHA_DE_DEVOLUCION", nullable = true)
  private LocalDate deadline;

  @Column(name = "TIPO_DE_PAGO")
  private String type;

  @Column(name = "REMITO")
  private String billPayment;

  @Column(name = "FECHA_PAGO")
  private LocalDate date;

  @Column(name = "COMPLETA")
  private Boolean complete; //TRUE SI DEVOLVIÓ EL DISFRAZ, FALSE SI NO DEVOLVIO EL DISFRAZ

  @Enumerated(EnumType.STRING)
  @Column(name = "STATUS_PAGO")
  private AmountStatus status;

  @Column(name="PAGO_PARCIAL")
  private Double partialPayment;

  @Column(name = "MONTO")
  private Double ammount;

  @Column(name = "PENDIENTE")
  private Double pending;

  @Column(name= "TOPE_FACTURACION")
  private Double limit;

  @Column(name= "RESTO_FACTURAR")
  private Double rest;


  @Column(name= "PAGO_REALIZADO")// SI ABONA UN APARTE AL RESERVAR POR TELEFONO Y ABONA EL RESTO AL RETIRAR EL DISEFRAZ
  private Boolean totalPayment;//TRUE SI AL MOMENTO DE RETIRAR EL DISFRAZ ABONA EL TOTAL ADEUDADO, FALSE SI TIENE SALDO PENDIENTE AL RETIRAR




  public TransactionEntity() {
  }

}
