package com.Pharmacy.Pharmacy_website.Controller;

import com.Pharmacy.Pharmacy_website.entity.Admin;
import com.Pharmacy.Pharmacy_website.entity.Message;
import com.Pharmacy.Pharmacy_website.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

public class HomeController {
    @Autowired
    private ProductService productService;

    @GetMapping({"/", "/home"})
    public String homePage() {
        return "HomePage";
    }

    @GetMapping("/products")
    public String productPage(Model model) {
        model.addAttribute("productList", productService.getAllProduct());

        return "Products";
    }

    @GetMapping("/contactUs")
    public String contactPage(Model model) {
        model.addAttribute("message", new Message());

        return "ContactUs";
    }

    @GetMapping("/aboutUs")
    public String aboutUs() {
        return "AboutUs";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("admin", new Admin());
        return "LoginPage";
    }

}