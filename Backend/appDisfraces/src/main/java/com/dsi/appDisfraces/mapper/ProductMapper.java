package com.dsi.appDisfraces.mapper;

import com.dsi.appDisfraces.dto.ClientTableDto;
import com.dsi.appDisfraces.dto.ProductDTO;
import com.dsi.appDisfraces.entity.ClientEntity;
import com.dsi.appDisfraces.entity.ProductEntity;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
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
    dto.setId(entity.getId());
    dto.setName(entity.getProductName());
    dto.setProductDescription(entity.getProductDescription());
    dto.setPrice(entity.getPrice());
    dto.setStock(entity.getStock());
    dto.setImage(entity.getProductImage());

    return dto;
  }

  public List<ProductDTO> productEntityList2DTOList(List<ProductEntity> entities) {
    List<ProductDTO> dtos = new ArrayList<>();
    for (ProductEntity entity : entities){
      dtos.add(this.productEntity2DTO(entity));
    }
    return dtos;
  }

  public void productEntityUpdate(ProductEntity entity, ProductDTO product) {
    entity.setProductName(product.getName());
    entity.setProductDescription(product.getProductDescription());
    entity.setPrice(product.getPrice());
    entity.setStock(product.getStock());
    entity.setProductImage(product.getImage());
  }
}
