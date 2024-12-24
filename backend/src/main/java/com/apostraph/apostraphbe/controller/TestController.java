package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping
    public String test(@RequestAttribute("properties") AuthenticatedRequestProperties user) {

        return "Hello!" + user.getUserId() + user.getLoginTargetSystem();
    }

}
