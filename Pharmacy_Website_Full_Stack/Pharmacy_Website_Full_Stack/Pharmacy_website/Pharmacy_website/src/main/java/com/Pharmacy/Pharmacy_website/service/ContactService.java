package com.Pharmacy.Pharmacy_website.service;

import com.Pharmacy.Pharmacy_website.entity.Message;
import com.Pharmacy.Pharmacy_website.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ContactService {
    @Autowired
    private ContactRepo contactRepo;

    public List<Message> getAllMessage() {
        return contactRepo.findAll();
    }

    public Message getMessageById(Long id) {
        return contactRepo.findById(id).orElseThrow(() -> new RuntimeException("Message with id " + id + " not found"));
    }

    public void createMessage(Message Message) {
        contactRepo.save(Message);
    }

    public void updateMessage(Message Message) {
        contactRepo.findById(Message.getId()).orElseThrow(() -> new RuntimeException("Message with id " + Message.getId() + " not found"));
        contactRepo.save(Message);
    }

    public void deleteMessage(Long id) {
        contactRepo.findById(id).orElseThrow(() -> new RuntimeException("Message with id " + id + " not found"));
        contactRepo.deleteById(id);
    }

}