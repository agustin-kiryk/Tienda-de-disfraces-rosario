package com.dsi.appDisfraces.entity;

import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.dsi.appDisfraces.enumeration.CustomeStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Disfraces")
@Getter@Setter
public class CostumeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "Nombre", nullable = false)
  private String name;

  @Column(name="Detalle")
  private String detail;

  @Enumerated(EnumType.STRING)
  @Column(name = "Status", columnDefinition = "varchar(255)")
  private CustomeStatus status;
  public CostumeEntity() {
    this.status = CustomeStatus.DISPONIBLE;
  }

  @Column(name = "Reserva", nullable = false)
  private String reservationDate;

  @Column(name = "Entrega", nullable = false)
  private String deadLine;

  @Column(name = "Imagen", nullable = false)
  private String image;

  @ManyToMany(mappedBy = "customes")
  private List<ClientEntity> clients = new ArrayList<>();
  private boolean deleted = Boolean.FALSE;

  public boolean isRented() {
    return status == CustomeStatus.ALQUILADO;
  }











}
