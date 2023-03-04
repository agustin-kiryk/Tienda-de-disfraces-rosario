package com.dsi.appDisfraces.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter @Setter
@Table(name="Clientes")
public class ClientEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name= "Nombre", nullable = false)
  private String name;

  @Column(name = "Apellido", nullable = false)
  private String lastName;

  @Column(name = "Direccion", nullable = false)
  private String Adress;

  @Column(name = "DNI", nullable = false)
  private String DocumentNumber;

  @Enumerated
  @Column(name = "Status", nullable = false)
  private String clientStatus;

  @Column(name = "Tipo_Cliente", nullable = false)
  private String type;

  @Column(name = "Imagen DNI", nullable = false)
  private Byte image;

  @Column (name = "Fecha_creacion")
  @CreationTimestamp
  private Date createDataTime;

  //TODO: Relacionar clientes con disfraces y hacer joincolumn
  //
  //TODO: Ver como relacionar el cliente con la fecha de entrega del disfraz (puede ser
  // mostrando la fecha de entrega cumpliendo la condicion  si el status está como pendiente de entrega)













}
