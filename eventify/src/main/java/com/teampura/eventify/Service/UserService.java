package com.teampura.eventify.service;

import com.teampura.eventify.Repository.UserRepository;
import com.teampura.eventify.entity.UserEntity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Create
    public User addUser(User user) {
        return userRepository.save(user);
    }
    
    //Read all
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //Read by ID
    public Optional<User> getUserById(Long userID) {
        return userRepository.findById(userID);
    }

    //Update
    public User updateUser(Long userID, User updatedUser) {
        return userRepository.findById(userID).map(user -> {
            user.setFname(updatedUser.getFname());
            user.setLname(updatedUser.getLname());
            user.setEmail(updatedUser.getEmail());
            user.setMobileNum(updatedUser.getMobileNum());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        })
        .orElseGet(null);
    }

    //Delete
    public void deleteUser(Long userID) {
        userRepository.deleteById(userID);

    }

    public User login(String email, String password) {
    return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password))
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

}
