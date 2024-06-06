package com.dsi.appDisfraces.enumeration;

import com.dsi.appDisfraces.entity.CostumeEntity;
import java.util.function.Predicate;

public enum CustomeStatus{

  ALQUILADO("ALQUILADO"), DISPONIBLE("DISPONIBLE"), RESERVADO("RESERVADO");

  private final String name ;

  CustomeStatus (String name) {
    this.name = name;
  }
  public CustomeStatus getName() {
    return CustomeStatus.valueOf(name);
  }

}
