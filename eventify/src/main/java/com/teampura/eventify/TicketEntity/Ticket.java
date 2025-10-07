package com.teampura.eventify.TicketEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ticket {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long ticketID;
    private double price;
    private int quantity;
    private String eventName;
    private String status;//temp
    
    public long getTicketID() { return ticketID; }
    public void setTicketID(long ticketID) { this.ticketID = ticketID; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
