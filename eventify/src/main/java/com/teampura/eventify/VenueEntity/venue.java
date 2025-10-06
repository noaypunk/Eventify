package com.teampura.eventify.VenueEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long venueID;

}
