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
    

}
