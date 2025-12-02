package com.teampura.eventify.Controller;

import com.teampura.eventify.entity.EventEntity.event;
import com.teampura.eventify.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // CREATE event
    @PostMapping
    public event addEvent(@RequestBody event e) {
        return eventService.addEvent(e);
    }

    // UPDATE event
    @PutMapping("/{id}")
    public event updateEvent(@PathVariable Long id, @RequestBody event updatedEvent) {
        return eventService.updateEvent(id, updatedEvent);
    }

    // READ ALL
    @GetMapping
    public List<event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Optional<event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
