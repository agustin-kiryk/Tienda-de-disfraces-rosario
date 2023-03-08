package com.dsi.appDisfraces.entity;

import com.dsi.appDisfraces.enumeration.ClientStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

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
  private String adress;

  @Column(name = "DNI", nullable = false)
  private String documentNumber;

  //@Enumerated
  //@Column(name = "Status")
  //private ClientStatus clientStatus;

  //@Column(name = "Tipo_Cliente", nullable = false)
 // private ClientStatus status;


  @Column(name = "Imagen DNI", nullable = false)
  private String image;


  @Column (name = "Fecha_creacion")
  @CreationTimestamp
  private Date createDataTime;

  @ManyToMany(
      cascade = {
          CascadeType.PERSIST,
          CascadeType.MERGE
      })
  @JoinTable(
      name= "Disfraz_Cliente",
      joinColumns = @JoinColumn(name= "Cliente_id"),
      inverseJoinColumns = @JoinColumn(name="Disfraz_id")
  )
  private List<CostumeEntity> customes = new ArrayList<>();
  private boolean deleted = Boolean.FALSE;



  //TODO: Ver como relacionar el cliente con la fecha de entrega del disfraz (puede ser
  // mostrando la fecha de entrega cumpliendo la condicion  si el status está como pendiente de entrega)













}
