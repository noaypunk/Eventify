package com.teampura.eventify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teampura.eventify.entity.EventEntity.event;

@Repository
public interface EventRepository extends JpaRepository<event, Long> {
    // No changes needed; JpaRepository handles CRUD
}
