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
    private String venueName;
    private String location;
    private int capacity;
    private String status;

    public long getVenueID() {
        return venueID;
    }
    public void setVenueID(long venueID) {
        this.venueID = venueID;
    }
    public String getVenueName() {
        return venueName;
    }
    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    

}
