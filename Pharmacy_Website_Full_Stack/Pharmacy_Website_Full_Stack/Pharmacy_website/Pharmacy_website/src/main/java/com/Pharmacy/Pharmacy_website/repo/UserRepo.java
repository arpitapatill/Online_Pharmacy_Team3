package com.Pharmacy.Pharmacy_website.repo;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
