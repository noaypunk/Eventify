package com.teampura.eventify.service;

import com.teampura.eventify.entity.PaymentEntity.payment;
import com.teampura.eventify.entity.UserEntity.User;
import com.teampura.eventify.Repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public payment savePayment(payment pay) {
        return paymentRepository.save(pay);
    }

    public List<payment> getPaymentsByUser(User user) {
        return paymentRepository.findByUser(user);
    }
}
