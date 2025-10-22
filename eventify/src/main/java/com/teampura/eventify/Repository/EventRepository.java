package com.teampura.eventify.Repository;

import com.teampura.eventify.Entity.EventEntity.event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<event, Long> {
    // Add custom queries here if needed (e.g. findByEventName)
}
