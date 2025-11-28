package com.teampura.eventify.service;

import com.teampura.eventify.Repository.TicketRepository;
import com.teampura.eventify.entity.TicketEntity.Ticket;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Create
    public Ticket addTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    //Read all
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    //Read by ID
    public Optional<Ticket> getTicketById(Long ticketID) {
        return ticketRepository.findById(ticketID);
    }

    //Update
    public Ticket updateTicket(Long ticketID, Ticket updatedTicket) {
        return ticketRepository.findById(ticketID).map(ticket -> {
            ticket.setPrice(updatedTicket.getPrice());
            ticket.setQuantity(updatedTicket.getQuantity());
            ticket.setEventName(updatedTicket.getEventName());
            ticket.setStatus(updatedTicket.getStatus());
            return ticketRepository.save(ticket);
        })
        .orElseGet(null);
    }

    //Delete
    public void deleteTicket(Long ticketID) {
        ticketRepository.deleteById(ticketID);

    }

}
