package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.service.channel.ChannelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/channels")
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping
    public Channel createChannel(
            @RequestBody Channel channel,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Creating channel.");
        return channelService.createChannel(channel, properties);
    }

    @GetMapping
    public List<Channel> getChannelsByOwnerId(@RequestAttribute("properties") AuthenticatedRequestProperties properties) {

        log.info("Getting all channels by owner id.");
        return channelService.getChannelsByOwnerId(properties);
    }

    @GetMapping("/{channelId}")
    public Channel getChannelById(
            @PathVariable UUID channelId,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Getting channel by id: [{}].", channelId);
        return channelService.getChannelById(channelId, properties);
    }

    @PatchMapping("/{channelId}")
    public Channel updateChannel(
            @PathVariable UUID channelId,
            @RequestBody Channel channel,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties) {

        log.info("Updating channel: [{}].", channelId);
        return channelService.updateChannel(channelId, channel, properties);
    }

    @PutMapping("/{channelId}/topics/enable")
    public void enableTopics(
            @PathVariable UUID channelId,
            @RequestBody Topic defaultTopic,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Enabling topic mode for channel: [{}].", channelId);
        channelService.enableTopics(channelId, defaultTopic, properties);
    }
}
