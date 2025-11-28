package com.teampura.eventify.Controller;

import com.teampura.eventify.dto.LoginRequest;
import com.teampura.eventify.entity.UserEntity.User;
import com.teampura.eventify.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}
