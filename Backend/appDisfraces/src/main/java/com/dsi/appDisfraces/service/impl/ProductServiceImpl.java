package com.dsi.appDisfraces.service.impl;

import com.dsi.appDisfraces.dto.ProductDTO;
import com.dsi.appDisfraces.entity.ProductEntity;
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
    ProductDTO result = productMapper.productEntity2DTO(productSaved);

    return result;
  }

  @Override
  public ProductDTO getDetailsById(Long id) {
    return null;
  }

  @Override
  public List<ProductDTO> findAll() {
    return null;
  }

  @Override
  public ProductDTO update(Long id, ProductDTO product) {
    return null;
  }

  @Override
  public void delete(Long id) {

  }
}
