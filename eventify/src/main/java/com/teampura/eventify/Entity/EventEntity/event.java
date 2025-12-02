package com.teampura.eventify.entity.EventEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "event") // matches your table
public class event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eventid")
    private Long eventID; // use Long instead of long for auto-gen

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_desc")
    private String eventDesc;

    @Column(name = "event_loc")
    private String eventLoc;

    @Column(name = "event_date")
    private String eventDate;

    @Column(name = "event_time")
    private String eventTime;

    @Column(name = "event_organizer")
    private String eventOrganizer;

    @Column(name = "event_image") // matches the DB column we'll create
    private String eventImage;

    // Getters and Setters
    public Long getEventID() { return eventID; }
    public void setEventID(Long eventID) { this.eventID = eventID; }

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

    public String getEventImage() { return eventImage; }
    public void setEventImage(String eventImage) { this.eventImage = eventImage; }
}
