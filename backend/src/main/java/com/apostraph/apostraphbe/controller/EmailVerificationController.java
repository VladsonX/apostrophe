package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/email/verification")
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    @GetMapping
    public String verifyEmail(@RequestParam String token) {

        log.info("Verifying email");
        emailVerificationService.verifyEmail(token);
        return "Success.";
    }

}
