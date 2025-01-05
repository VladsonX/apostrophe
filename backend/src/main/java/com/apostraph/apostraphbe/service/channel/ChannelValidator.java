package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.Topic;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static java.util.Objects.requireNonNullElse;

@Service
public class ChannelValidator {

    public void validateChannelOnCreation(Channel channel) {

        validateChannelName(channel.getName());
        validateChannelDescription(channel.getDescription());

        if (channel.getTopicsEnabled() == null) {
            throw new IllegalArgumentException("Topic mode is not specified.");
        }

        validateTopics(channel);
    }

    private void validateChannelName(String channelName) {

        if (StringUtils.isBlank(channelName)) {
            throw new IllegalArgumentException("Channel name can not be empty.");
        }

        if (channelName.length() > 100) {
            throw new IllegalArgumentException("Too long channel name.");
        }
    }

    private void validateChannelDescription(String description) {

        if (StringUtils.isBlank(description)) {
            throw new IllegalArgumentException("Description can not be empty.");
        }

        if (description.length() > 500) {
            throw new IllegalArgumentException("Description is too long.");
        }
    }

    private void validateTopics(Channel channel) {

        boolean isTopicsEnabled = channel.getTopicsEnabled();
        List<Topic> topics = requireNonNullElse(channel.getTopics(), Collections.emptyList());


        if (isTopicsEnabled && topics.isEmpty()) {
            throw new IllegalArgumentException("Attach at least one topic when topics are enabled.");
        }

        if (!isTopicsEnabled && !topics.isEmpty()) {
            throw new IllegalArgumentException("Topics are not allowed when disabled.");
        }
    }

}
