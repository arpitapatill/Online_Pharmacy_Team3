package com.Pharmacy.Pharmacy_website.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Pharmacy.Pharmacy_website.dto.AuthRequest;
import com.Pharmacy.Pharmacy_website.dto.AuthResponse;
import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.entity.User;
import com.Pharmacy.Pharmacy_website.repo.AdminRepo;
import com.Pharmacy.Pharmacy_website.repo.UserRepo;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private com.Pharmacy.Pharmacy_website.security.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, null, "Email and password required"));
        }

        // Admin first
        Admin admin = adminRepo.findByEmail(email);
        if (admin != null) {
            String stored = admin.getPassword();
            boolean ok = stored != null && (
                stored.equals(password) || // fallback if stored is plain
                passwordEncoder.matches(password, stored) // hashed match
            );
            if (ok) {
                return ResponseEntity.ok(new AuthResponse(true, "admin", "Login successful"));
            }
        }

        // Then user
        User user = userRepo.findByEmail(email);
        if (user != null) {
            String stored = user.getPassword();
            boolean ok = stored != null && (
                stored.equals(password) || // in case legacy/plain is stored
                passwordEncoder.matches(password, stored)
            );
            if (ok) {
                return ResponseEntity.ok(new AuthResponse(true, "user", "Login successful", user.getId(), user.getName(), user.getEmail()));
            }
        }

        return ResponseEntity.status(401).body(new AuthResponse(false, null, "Invalid email or password"));
    }
}