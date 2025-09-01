package com.Pharmacy.Pharmacy_website.dto;

public class AuthResponse {
    private boolean success;
    private String role; // "admin" or "user"
    private String message;
    private Long id;
    private String name;
    private String email;

    public AuthResponse() {}
    
    public AuthResponse(boolean success, String role, String message) {
        this.success = success;
        this.role = role;
        this.message = message;
    }
    
    public AuthResponse(boolean success, String role, String message, Long id, String name, String email) {
        this.success = success;
        this.role = role;
        this.message = message;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}