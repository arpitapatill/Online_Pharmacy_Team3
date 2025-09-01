package com.Pharmacy.Pharmacy_website.service;

import com.Pharmacy.Pharmacy_website.entity.Order;
import com.Pharmacy.Pharmacy_website.entity.User;
import com.Pharmacy.Pharmacy_website.repo.OrderRepo;
import com.Pharmacy.Pharmacy_website.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrder() {
        return orderRepo.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order with id " + id + " not found"));
    }

    public void createOrder(Order Order) {
        orderRepo.save(Order);
    }

    public void updateOrder(Order Order) {
        orderRepo.findById(Order.getId()).orElseThrow(() -> new RuntimeException("Order with id " + Order.getId() + " not found"));
        orderRepo.save(Order);
    }

    public void deleteOrder(Long id) {
        orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order with id " + id + " not found"));
        orderRepo.deleteById(id);
    }

    public List<Order> findOrdersByUser(User user) {
        return orderRepo.findByUser(user);
    }

}