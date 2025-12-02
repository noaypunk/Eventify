package com.teampura.eventify.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @GetMapping("/")
    public String redirectToTest() {
        return "Back end is running!!!!!!";
    }


}
