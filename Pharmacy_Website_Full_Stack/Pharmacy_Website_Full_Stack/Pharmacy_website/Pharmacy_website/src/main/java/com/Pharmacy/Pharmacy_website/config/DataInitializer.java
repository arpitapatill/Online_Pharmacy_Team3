package com.Pharmacy.Pharmacy_website.config;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.repo.AdminRepo;
import com.Pharmacy.Pharmacy_website.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public void run(String... args) {
        // Create demo admin if not exists
        if (adminRepo.findByEmail("admin@pharmacy.com") == null) {
            Admin admin = new Admin();
            admin.setEmail("admin@pharmacy.com");
            admin.setPassword("admin123");
            admin.setName("Admin User");
            adminRepo.save(admin);
            System.out.println("Demo admin created: admin@pharmacy.com / admin123");
        }
        
        // No demo products initialization - products will be added by admin through dashboard
    }
}
