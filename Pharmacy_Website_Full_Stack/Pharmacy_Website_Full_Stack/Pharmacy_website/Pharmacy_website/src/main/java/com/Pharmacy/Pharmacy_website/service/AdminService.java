package com.Pharmacy.Pharmacy_website.service;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepo adminRepo;

    public List<Admin> getAllAdmin(){
        return adminRepo.findAll();
    }

    public Admin getAdminById(Long id){
        return adminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin with id " + id + "not found"));
    }

    public void createUser(Admin admin){
        adminRepo.save(admin);
    }


    public void updateAdmin( Admin admin ){
         adminRepo.findById(admin.getId())
                .orElseThrow(() -> new RuntimeException("Admin with id " + admin.getId() + "not found"));
           adminRepo.save(admin);
    }
    public void deleteAdmin(Long id) {
        adminRepo.findById(id).orElseThrow(() -> new RuntimeException("Admin with id " + id + " not found"));
        adminRepo.deleteById(id);
    }

    public boolean verifyCredentials(String email, String password) {
        Admin admin = adminRepo.findByEmail(email);
        if (admin.getPassword().equals(password)) {
            return true;
        }else {
            return false;
        }
    }
}
