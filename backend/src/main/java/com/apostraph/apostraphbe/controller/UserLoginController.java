package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.LoginRequest;
import com.apostraph.apostraphbe.dto.LoginResponse;
import com.apostraph.apostraphbe.service.UserLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
public class UserLoginController {

    private final UserLoginService userLoginService;

    @PostMapping
    public LoginResponse processLoginRequest(@RequestBody LoginRequest loginRequest) {

        log.info("Processing login request.");
        return userLoginService.processLoginRequest(loginRequest);
    }

}
