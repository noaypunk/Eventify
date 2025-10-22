package com.teampura.eventify.Controller;

import com.teampura.eventify.Entity.EventEntity.event;
import com.teampura.eventify.Service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // CREATE
    @PostMapping
    public event addEvent(@RequestBody event e) {
        return eventService.addEvent(e);
    }

    // READ ALL
    @GetMapping
    public List<event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Optional<event> getEventById(@PathVariable("id") Long eventID) {
        return eventService.getEventById(eventID);
    }

    // UPDATE
    @PutMapping("/{id}")
    public event updateEvent(@PathVariable("id") Long eventID, @RequestBody event updatedEvent) {
        return eventService.updateEvent(eventID, updatedEvent);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") Long eventID) {
        eventService.deleteEvent(eventID);
    }
}
