package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.Channel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class ChannelValidator {

    public void validateChannelOnCreation(Channel channel) {

        validateChannelName(channel.getName());
        validateChannelDescription(channel.getDescription());
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

}
