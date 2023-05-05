package com.dsi.appDisfraces.enumeration;

public enum ProductStatus {
  AGOTADO("AGOTADO"), BAJO("STOCK BAJO"), DISPONIBLE("DISPONIBLE");

  private final String name ;

  ProductStatus(String name) {
    this.name = name;
  }
  public ProductStatus getName() {
    return ProductStatus.valueOf(name);
  }

}
