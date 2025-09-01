package com.Pharmacy.Pharmacy_website.repo;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Products, Long> {
    public Products findByName(String name);
}
