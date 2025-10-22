package com.teampura.eventify.Service;

import com.teampura.eventify.Entity.EventEntity.event;
import com.teampura.eventify.Repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // CREATE
    public event addEvent(event e) {
        return eventRepository.save(e);
    }

    // READ ALL
    public List<event> getAllEvents() {
        return eventRepository.findAll();
    }

    // READ BY ID
    public Optional<event> getEventById(Long eventID) {
        return eventRepository.findById(eventID);
    }

    // UPDATE
    public event updateEvent(Long eventID, event updatedEvent) {
        return eventRepository.findById(eventID).map(existing -> {
            existing.setEventName(updatedEvent.getEventName());
            existing.setEventDesc(updatedEvent.getEventDesc());
            existing.setEventLoc(updatedEvent.getEventLoc());
            existing.setEventDate(updatedEvent.getEventDate());
            existing.setEventTime(updatedEvent.getEventTime());
            existing.setEventOrganizer(updatedEvent.getEventOrganizer());
            return eventRepository.save(existing);
        }).orElse(null);
    }

    // DELETE
    public void deleteEvent(Long eventID) {
        eventRepository.deleteById(eventID);
    }
}
