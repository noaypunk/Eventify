package com.teampura.eventify.EventEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long eventID;
   
}
