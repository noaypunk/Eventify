package com.teampura.eventify.Repository;

import com.teampura.eventify.Entity.UserEntity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    List<User> findByFname(String fname);

    List<User> findByLname(String lname);

    Optional<User> findByMobileNum(Long mobileNum);

    List<User> findByContainingIgnoreCase(String fname);
}
