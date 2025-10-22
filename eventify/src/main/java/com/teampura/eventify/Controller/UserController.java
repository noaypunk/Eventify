package com.teampura.eventify.Controller;
import com.teampura.eventify.Entity.UserEntity.User;
import com.teampura.eventify.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Create
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    //Read all
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //Read by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long userID) {
        return userService.getUserById(userID);
    }

    //Update
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long userID, @RequestBody User updatedUser) {
        return userService.updateUser(userID, updatedUser);
    }

    //Delete
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long userID) {
        userService.deleteUser(userID);
    }

}
