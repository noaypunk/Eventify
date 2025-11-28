package com.teampura.eventify.entity.EventEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long eventID;
    private String eventName;
    private String eventDesc;
    private String eventLoc;
    private String eventDate; 
    private String eventTime;
    private String eventOrganizer;//temp

    public long getEventID() { return eventID; }
    public void setEventID(long eventID) { this.eventID = eventID; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getEventDesc() { return eventDesc; }
    public void setEventDesc(String eventDesc) { this.eventDesc = eventDesc; }

    public String getEventLoc() { return eventLoc; }
    public void setEventLoc(String eventLoc) { this.eventLoc = eventLoc; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
    
    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }

    public String getEventOrganizer() { return eventOrganizer; }
    public void setEventOrganizer(String eventOrganizer) { this.eventOrganizer = eventOrganizer; }
}