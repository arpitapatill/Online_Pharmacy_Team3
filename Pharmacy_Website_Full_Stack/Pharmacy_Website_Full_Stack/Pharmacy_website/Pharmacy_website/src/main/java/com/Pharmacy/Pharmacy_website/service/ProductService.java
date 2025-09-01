package com.Pharmacy.Pharmacy_website.service;

import com.Pharmacy.Pharmacy_website.entity.Products;
import com.Pharmacy.Pharmacy_website.entity.User;
import com.Pharmacy.Pharmacy_website.repo.ProductRepo;
import com.Pharmacy.Pharmacy_website.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    public List<Products> getAllProduct() {
        return productRepo.findAll();
    }

    public Products getProductById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product with id " + id + " not found"));
    }

    public Products createProduct(Products product) {
        return productRepo.save(product);
    }

    public Products updateProduct(Products product) {
        productRepo.findById(product.getId()).orElseThrow(() -> new RuntimeException("Product with id " + product.getId() + " not found"));
        return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product with id " + id + " not found"));
        productRepo.deleteById(id);
    }

    public Products findProductByName(String name) {
        return productRepo.findByName(name);
    }

}