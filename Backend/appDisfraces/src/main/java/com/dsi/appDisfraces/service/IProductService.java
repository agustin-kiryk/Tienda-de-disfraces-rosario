package com.dsi.appDisfraces.service;

import com.dsi.appDisfraces.dto.ProductDTO;
import java.util.List;

public interface IProductService {

  ProductDTO create(ProductDTO productDTO);

  ProductDTO getDetailsById(Long id);

  List<ProductDTO> findAll();

  ProductDTO update(Long id, ProductDTO product);

  void delete(Long id);
}
