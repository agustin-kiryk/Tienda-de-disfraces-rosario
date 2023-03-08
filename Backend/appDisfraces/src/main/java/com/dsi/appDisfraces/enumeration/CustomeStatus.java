package com.dsi.appDisfraces.enumeration;

public enum CustomeStatus {

  ALQUILADO("ALQUILADO"), DISPONIBLE("DISPONIBLE"), RESERVADO("RESERVADO");

  private final String name ;

  CustomeStatus (String name) {
    this.name = name;
  }
  public CustomeStatus getName() {
    return CustomeStatus.valueOf(name);
  }

}
