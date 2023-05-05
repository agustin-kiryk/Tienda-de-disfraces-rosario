package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.ProductDTO;
import com.dsi.appDisfraces.entity.ProductEntity;
import lombok.Data;

@Data
public class ProductMapper {


  public ProductEntity productDTO2Entity(ProductDTO productDTO) {

    ProductEntity entity = new ProductEntity();

    entity.setProductName(productDTO.getName());
    entity.setProductDescription(productDTO.getProductDescription());
    entity.setPrice(productDTO.getPrice());
    entity.setStock(productDTO.getStock());
    entity.setProductImage(productDTO.getProductDescription());

    return entity;
  }

  public ProductDTO productEntity2DTO(ProductEntity entity) {

    ProductDTO dto = new ProductDTO();
    dto.setName(entity.getProductName());
    dto.setProductDescription(entity.getProductDescription());
    dto.setPrice(entity.getPrice());
    dto.setStock(entity.getStock());
    dto.setImage(entity.getProductImage());

    return dto;
  }
}
