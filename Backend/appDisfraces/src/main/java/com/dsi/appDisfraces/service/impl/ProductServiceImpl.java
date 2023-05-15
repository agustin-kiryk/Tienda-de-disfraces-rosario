package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.ProductDTO;
import com.dsi.appDisfraces.entity.ProductEntity;
import com.dsi.appDisfraces.exception.IdNotFound;
import com.dsi.appDisfraces.mapper.ProductMapper;
import com.dsi.appDisfraces.repository.ProductRepository;
import com.dsi.appDisfraces.service.IProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements IProductService {

  @Autowired
  ProductRepository productRepository;
  @Autowired
  ProductMapper productMapper;


  @Override
  public ProductDTO create(ProductDTO productDTO) {
    ProductEntity productEntity = productMapper.productDTO2Entity(productDTO);
    ProductEntity productSaved = productRepository.save(productEntity);
    return productMapper.productEntity2DTO(productSaved);
  }

  @Override
  public ProductDTO getDetailsById(Long id) {
    ProductEntity entity = productRepository.findById(id).orElseThrow(
        ()->new IdNotFound("el ID del producto no existe"));
    ProductDTO productDTO = productMapper.productEntity2DTO(entity);
    return productDTO;
  }

  @Override
  public List<ProductDTO> findAll() {
    List<ProductEntity> entities = this.productRepository.findAll();
    List<ProductDTO> result = this.productMapper.productEntityList2DTOList(entities);

    return result;
  }

  @Override
  public ProductDTO update(Long id, ProductDTO product) {
    ProductEntity entity = productRepository.findById(id).orElseThrow(
        ()-> new IdNotFound("El ID del prodcuto no existe"));
    this.productMapper.productEntityUpdate(entity, product);
    ProductEntity entityUpdate = productRepository.save(entity);
    ProductDTO result = productMapper.productEntity2DTO(entityUpdate);

    return result;
  }

  @Override
  public void delete(Long id) {
    ProductEntity entity = productRepository.findById(id).orElseThrow(
        ()-> new IdNotFound("El ID del prodcuto no existe"));
    this.productRepository.delete(entity);

  }
}
