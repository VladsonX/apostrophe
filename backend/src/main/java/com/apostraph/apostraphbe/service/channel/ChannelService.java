package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.exception.UnauthorizedAccessException;
import com.apostraph.apostraphbe.mapper.ChannelMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.apostraph.apostraphbe.util.TargetSystemUtils.validateTargetSystem;
import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final ChannelValidator channelValidator;
    private final ChannelMapper channelMapper;

    public Channel createChannel(Channel channel, AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        channelValidator.validateChannelOnCreation(channel);

        ChannelEntity channelEntity = channelMapper.mapToEntity(channel);
        channelEntity.setOwnerId(properties.getUserId());

        ChannelEntity savedChannelEntity = channelRepository.save(channelEntity);
        return channelMapper.mapToDto(savedChannelEntity);
    }

    public List<Channel> getChannelsByOwnerId(AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        return channelRepository.findAllByOwnerId(properties.getUserId())
                .stream()
                .map(channelMapper::mapToDto)
                .toList();
    }

    public Channel getChannelById(UUID channelId, AuthenticatedRequestProperties properties) {

        ChannelEntity channelEntity = channelRepository.findById(channelId)
                .orElseThrow(() -> {
                    String message = format("Could not find channel by id: [%s].", channelId);
                    return new NotFoundException(message);
                });

        if (!properties.getUserId().equals(channelEntity.getOwnerId())) {
            throw new UnauthorizedAccessException("Access denied.");
        }

        return channelMapper.mapToDto(channelEntity);
    }

}
