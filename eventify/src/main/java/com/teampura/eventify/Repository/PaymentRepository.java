package com.teampura.eventify.Repository;

import com.teampura.eventify.entity.PaymentEntity.payment;
import com.teampura.eventify.entity.UserEntity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<payment, Long> {
    List<payment> findByUser(User user);
}
