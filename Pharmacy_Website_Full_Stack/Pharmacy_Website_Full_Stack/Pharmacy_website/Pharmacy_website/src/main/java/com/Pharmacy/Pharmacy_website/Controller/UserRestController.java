package com.Pharmacy.Pharmacy_website.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Pharmacy.Pharmacy_website.entity.User;
import com.Pharmacy.Pharmacy_website.repo.UserRepo;
import com.Pharmacy.Pharmacy_website.security.PasswordEncoder;

import java.util.logging.Logger;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserRestController {

    private static final Logger logger = Logger.getLogger(UserRestController.class.getName());
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    static class UserResponse {
        public Long id; public String name; public String email;
        UserResponse(User u) { this.id = u.getId(); this.name = u.getName(); this.email = u.getEmail(); }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Validate required fields
            if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
                return ResponseEntity.badRequest().body("Name, email and password are required");
            }
            
            // Validate email format
            if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
                return ResponseEntity.badRequest().body("Invalid email format");
            }
            
            // Validate password strength
            if (user.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body("Password must be at least 6 characters long");
            }
            
            // Check if email is already in use
            User existing = userRepo.findByEmail(user.getEmail());
            if (existing != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
            }
            
            // Encode password before saving
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            
            // Save user
            User saved = userRepo.save(user);
            logger.info("New user registered: " + user.getEmail());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserResponse(saved));
        } catch (Exception e) {
            logger.severe("Error creating user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration");
        }
    }
}