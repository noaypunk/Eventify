package com.teampura.eventify.Repository;

import com.teampura.eventify.Entity.TicketEntity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    List<Ticket> findByEventName(String eventName);

    List<Ticket> findByPrice(double price);

    List<Ticket> findByStatus(String status);

    List<Ticket> findByPriceGreaterThan(double price);

    List<Ticket> findByPriceLessThan(double price);

    List<Ticket> findByQuantityGreaterThan(int quantity);

    List<Ticket> findByQuantityLessThan(int quantity);
    
}
