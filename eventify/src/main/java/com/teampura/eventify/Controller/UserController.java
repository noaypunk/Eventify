package com.teampura.eventify.Controller;

import com.teampura.eventify.entity.UserEntity.User;
import com.teampura.eventify.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // Read all
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Read by ID
    @GetMapping("/{userID}") // match variable name
    public Optional<User>    getUserById(@PathVariable Long userID) {
        return userService.getUserById(userID);
    }

    // Update
    @PutMapping("/{userID}") // match variable name
    public User updateUser(@PathVariable Long userID, @RequestBody User updatedUser) {
        return userService.updateUser(userID, updatedUser);
    }

    // Delete
    @DeleteMapping("/{userID}") // match variable name
    public void deleteUser(@PathVariable Long userID) {
        userService.deleteUser(userID);
    }

    @PutMapping("/{userID}/updatePassword")
public ResponseEntity<String> updatePassword(
        @PathVariable Long userID,
        @RequestBody Map<String, String> payload) {

    String currentPassword = payload.get("currentPassword");
    String newPassword = payload.get("newPassword");

    Optional<User> optionalUser = userService.getUserById(userID);
    if (!optionalUser.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    User user = optionalUser.get();

    // 1. Check current password
    if (!user.getPassword().equals(currentPassword)) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password incorrect");
    }

    // 2. Validate new password
    if (!isValidPassword(newPassword)) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("New password does not meet requirements");
    }

    // 3. Update password
    user.setPassword(newPassword);
    userService.updateUser(userID, user);

    return ResponseEntity.ok("Password updated successfully");
}

// Simple password validation function
private boolean isValidPassword(String password) {
    if (password.length() < 12) return false;
    if (!password.matches(".*[A-Z].*")) return false; // uppercase
    if (!password.matches(".*[a-z].*")) return false; // lowercase
    if (!password.matches(".*\\d.*")) return false;   // number
    if (!password.matches(".*[!@#$%^&*].*")) return false; // special char
    return true;
}

}
