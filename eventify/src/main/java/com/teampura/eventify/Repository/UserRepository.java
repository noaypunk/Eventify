package com.teampura.eventify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teampura.eventify.entity.UserEntity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    List<User> findByFname(String fname);

    List<User> findByLname(String lname);

    Optional<User> findByMobileNum(Long mobileNum);

    // Corrected search method
    List<User> findByFnameContainingIgnoreCase(String fname);
}
