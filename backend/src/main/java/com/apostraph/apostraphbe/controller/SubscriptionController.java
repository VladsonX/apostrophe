package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.Subscription;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping
    public Subscription createSubscription(
            @RequestBody Subscription subscription,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Creating subscription.");
        return subscriptionService.createSubscription(subscription, properties);
    }

    @GetMapping
    public List<Subscription> getSubscriptions(
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Getting subscriptions.");
        return subscriptionService.getSubscriptions(properties);
    }

}
