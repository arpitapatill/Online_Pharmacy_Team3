package com.Pharmacy.Pharmacy_website.repo;

import com.Pharmacy.Pharmacy_website.entity.Order;
import com.Pharmacy.Pharmacy_website.entity.Products;
import com.Pharmacy.Pharmacy_website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    public List<Order> findByUser(User user);

}