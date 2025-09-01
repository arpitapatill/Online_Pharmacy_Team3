package com.Pharmacy.Pharmacy_website.Controller;

import com.Pharmacy.Pharmacy_website.entity.Message;
import com.Pharmacy.Pharmacy_website.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/send/message")
    public String sendMessage(Message message, Model model) {
        contactService.createMessage(message);
        model.addAttribute("confirmation", "Your message has been successfully sent!!");

        return "ContactUs";
    }


}
