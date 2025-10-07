package com.teampura.eventify.PaymentEntity;

import jakarta.persistence.*;



@Entity
public class payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long paymentID;

    private String paymentMethod;
    private double amount;
    private String paymentDate;
    private String status;

    public long getPaymentID() {
        return paymentID;
    }
    public void setPaymentID(long paymentID) {
        this.paymentID = paymentID;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getPaymentDate() {
        return paymentDate;
    }
    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}
