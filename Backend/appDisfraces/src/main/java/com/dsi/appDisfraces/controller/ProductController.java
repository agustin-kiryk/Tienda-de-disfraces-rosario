package com.dsi.appDisfraces.controller;

import com.dsi.appDisfraces.dto.ProductDTO;
import com.dsi.appDisfraces.service.IProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")

public class ProductController {

  @Autowired
  IProductService productService;

  @PostMapping("/newProduct")
  public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO){
    ProductDTO result = productService.create(productDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);

  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
    ProductDTO product = this.productService.getDetailsById(id);
    return ResponseEntity.ok(product);
  }

  @GetMapping()
  public ResponseEntity<List<ProductDTO>> getAllProducts() {
    List<ProductDTO> product = this.productService.findAll();
    return ResponseEntity.ok().body(product);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ProductDTO> update(
      @PathVariable Long id, @RequestBody ProductDTO product) {
    ProductDTO result = this.productService.update(id, product);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    this.productService.delete(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }






}
