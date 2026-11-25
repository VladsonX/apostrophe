package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.service.channel.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/channels/{channelId}/topics")
public class TopicController {

    private final TopicService topicService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void appendTopic(
            @PathVariable UUID channelId,
            @RequestBody Topic topic,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Appending topic.");
        topicService.appendTopic(channelId, topic, properties);
    }

}

