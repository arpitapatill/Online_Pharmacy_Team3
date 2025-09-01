package com.Pharmacy.Pharmacy_website.repo;

import com.Pharmacy.Pharmacy_website.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactRepo extends JpaRepository<Message, Long> {

}