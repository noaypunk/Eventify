package com.teampura.eventify.entity.PaymentEntity;

import com.teampura.eventify.entity.UserEntity.User;
import com.teampura.eventify.entity.EventEntity.event;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "payment")
public class payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentID;

    private String paymentMethod;
    private double amount;
    private String paymentDate;
    private String status;

    // Foreign keys
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private event event;

    // Getters and Setters
    public long getPaymentID() { return paymentID; }
    public void setPaymentID(long paymentID) { this.paymentID = paymentID; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaymentDate() { return paymentDate; }
    public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }

    public void setPaymentDateNow() {
        this.paymentDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public event getEvent() { return event; }
    public void setEvent(event event) { this.event = event; }
}
