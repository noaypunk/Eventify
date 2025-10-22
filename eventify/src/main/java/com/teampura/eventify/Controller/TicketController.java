package com.teampura.eventify.Controller;
import com.teampura.eventify.Entity.TicketEntity.Ticket;
import com.teampura.eventify.Service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    //Create
    @PostMapping
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    //Read all
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    //Read by ID
    @GetMapping("/{id}")
    public Optional<Ticket> getTicketById(@PathVariable Long ticketID) {
        return ticketService.getTicketById(ticketID);
    }

    //Update
    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long ticketID, @RequestBody Ticket updatedTicket) {
        return ticketService.updateTicket(ticketID, updatedTicket);
    }

    //Delete
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long ticketID) {
        ticketService.deleteTicket(ticketID);
    }
}
