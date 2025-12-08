package com.teampura.eventify.Controller;

import com.teampura.eventify.dto.PaymentRequest;
import com.teampura.eventify.entity.PaymentEntity.payment;
import com.teampura.eventify.entity.UserEntity.User;
import com.teampura.eventify.entity.EventEntity.event;
import com.teampura.eventify.service.PaymentService;
import com.teampura.eventify.Repository.UserRepository;
import com.teampura.eventify.Repository.EventRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;


@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend calls
public class PaymentController {

    private final PaymentService paymentService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public PaymentController(PaymentService paymentService,
                             UserRepository userRepository,
                             EventRepository eventRepository) {
        this.paymentService = paymentService;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    // Submit a new payment
    @PostMapping("/submit")
    public ResponseEntity<?> submitPayment(@RequestBody PaymentRequest request) {
        try {
            User user = userRepository.findById(request.getUserId()).orElseThrow(() -> 
                new RuntimeException("User not found"));
            event eventObj = eventRepository.findById(request.getEventId()).orElseThrow(() -> 
                new RuntimeException("Event not found"));

            payment pay = new payment();
            pay.setUser(user);
            pay.setEvent(eventObj);
            pay.setAmount(request.getAmount());
            pay.setPaymentMethod(request.getPaymentMethod());
            pay.setStatus("PAID");
            pay.setPaymentDateNow();

            payment saved = paymentService.savePayment(pay);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Get all payments for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPayments(@PathVariable Long userId) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found"));
            List<payment> payments = paymentService.getPaymentsByUser(user);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
