package com.Pharmacy.Pharmacy_website.Controller;

import com.Pharmacy.Pharmacy_website.entity.Products;
import com.Pharmacy.Pharmacy_website.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable Long id) {
        Products product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Products product) {
        try {
            // Validate required fields
            if (product.getName() == null || product.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product name is required");
            }
            if (product.getPrice() <= 0) {
                return ResponseEntity.badRequest().body("Product price must be greater than zero");
            }
            if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product category is required");
            }
            
            // Set default values for optional fields if not provided
            if (product.getImage() == null || product.getImage().trim().isEmpty()) {
                product.setImage("https://via.placeholder.com/300x300.png?text=No+Image");
            }
            if (product.getRating() <= 0) {
                product.setRating(4.5); // Default rating
            }
            
            Products savedProduct = productService.createProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create product: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Products product) {
        try {
            // Validate required fields
            if (product.getName() == null || product.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product name is required");
            }
            if (product.getPrice() <= 0) {
                return ResponseEntity.badRequest().body("Product price must be greater than zero");
            }
            if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product category is required");
            }
            
            // Set default values for optional fields if not provided
            if (product.getImage() == null || product.getImage().trim().isEmpty()) {
                product.setImage("https://via.placeholder.com/300x300.png?text=No+Image");
            }
            if (product.getRating() <= 0) {
                product.setRating(4.5); // Default rating
            }
            
            product.setId(id);
            Products updatedProduct = productService.updateProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update product: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

}
