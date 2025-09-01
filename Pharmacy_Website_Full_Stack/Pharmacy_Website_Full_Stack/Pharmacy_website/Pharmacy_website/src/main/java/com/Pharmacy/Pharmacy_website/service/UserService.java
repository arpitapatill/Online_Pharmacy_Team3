package com.Pharmacy.Pharmacy_website.service;

import com.Pharmacy.Pharmacy_website.entity.User;
import com.Pharmacy.Pharmacy_website.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
    }

    public void createUser(User user) {
        userRepo.save(user);
    }

    public void updateUser(User User) {
        userRepo.findById(User.getId()).orElseThrow(() -> new RuntimeException("User with id " + User.getId() + " not found"));
        userRepo.save(User);
    }

    public void deleteUser(Long id) {
        userRepo.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
        userRepo.deleteById(id);
    }

    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public boolean verifyCredentials(String email, String password) {
        User User = userRepo.findByEmail(email);
        if (User.getPassword().equals(password)) {
            return true;
        }

        return false;
    }

}