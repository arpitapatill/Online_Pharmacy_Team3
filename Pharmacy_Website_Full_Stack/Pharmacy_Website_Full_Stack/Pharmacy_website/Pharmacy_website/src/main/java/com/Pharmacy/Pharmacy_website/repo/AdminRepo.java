package com.Pharmacy.Pharmacy_website.repo;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Long> {
    public Admin findByEmail(String email);
}
