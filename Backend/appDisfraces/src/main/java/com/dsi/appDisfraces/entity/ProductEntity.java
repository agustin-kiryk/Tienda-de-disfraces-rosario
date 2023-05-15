package com.dsi.appDisfraces.entity;

import com.dsi.appDisfraces.enumeration.ProductStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "PRODUCTOS")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID", nullable = false)
  private Long id;
  private String productName;
  private String productDescription;
  private Double price;
  private Long stock;
  private String productImage;
  @Enumerated(EnumType.STRING)
  private ProductStatus productStatus;
  @Column (name = "FECHA_CREACION")
  @CreationTimestamp
  private LocalDate createDataTime;

  @ManyToMany(mappedBy = "products")
  private List<ClientEntity> clients = new ArrayList<>();

  @ManyToMany(mappedBy = "products", cascade = CascadeType.PERSIST) //TODO: Revisar que la cascade ande ok.
  private Set<TransactionEntity> transactions = new HashSet<>();



}
