package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.PostEntity;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.exception.UnauthorizedAccessException;
import com.apostraph.apostraphbe.mapper.ChannelMapper;
import com.apostraph.apostraphbe.mapper.TopicMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.repository.PostRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.util.TargetSystemUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.apostraph.apostraphbe.util.TargetSystemUtils.validateTargetSystem;
import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final ChannelValidator channelValidator;
    private final TopicValidator topicValidator;
    private final ChannelMapper channelMapper;
    private final TopicMapper topicMapper;
    private final PostRepository postRepository;

    public Channel createChannel(Channel channel, AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        channelValidator.validateChannelOnCreation(channel);

        ChannelEntity channelEntity = channelMapper.mapToEntity(channel);
        channelEntity.setOwnerId(properties.getUserId());

        if (channel.getTopicsEnabled()) {
            channel.getTopics().forEach(topicValidator::validateTopic);
        } else {
            channel.setTopics(new ArrayList<>());
        }


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

        ChannelEntity channelEntity = findChannelEntityById(channelId);

        if (properties.getLoginTargetSystem() == LoginTargetSystem.STUDIO) {
            validateUserHasAccessToChannel(channelEntity, properties.getUserId());
        }

        return channelMapper.mapToDto(channelEntity);
    }

    public Channel updateChannel(UUID channelId, Channel updatedChannel, AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        ChannelEntity channelEntity = findChannelEntityById(channelId);

        if (!properties.getUserId().equals(channelEntity.getOwnerId())) {
            throw new UnauthorizedAccessException("Access denied.");
        }

        if (!StringUtils.isBlank(updatedChannel.getName())) {
            channelEntity.setName(updatedChannel.getName());
        }

        if (!StringUtils.isBlank(updatedChannel.getDescription())) {
            channelEntity.setDescription(updatedChannel.getDescription());
        }

        if (updatedChannel.getAvatar() != null) {
            channelEntity.setAvatar(updatedChannel.getAvatar());
        }

        ChannelEntity savedChannelEntity = channelRepository.save(channelEntity);
        return channelMapper.mapToDto(savedChannelEntity);
    }

    @Transactional
    public void enableTopics(UUID channelId, Topic defaultTopic, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        ChannelEntity channelEntity = findChannelEntityById(channelId);

        if (!properties.getUserId().equals(channelEntity.getOwnerId())) {
            throw new UnauthorizedAccessException("Access denied.");
        }

        if (channelEntity.getTopicsEnabled()) {
            throw new IllegalArgumentException("Topics have been already created.");
        }

        topicValidator.validateTopic(defaultTopic);
        topicValidator.validateTopicNameIsAvailable(defaultTopic, channelEntity.getTopics());

        channelEntity.setTopicsEnabled(true);
        channelEntity.getTopics().add(topicMapper.mapToEntity(defaultTopic));

        ChannelEntity savedChannelEntity = channelRepository.save(channelEntity);

        List<PostEntity> postEntities = postRepository.findAllByChannel(savedChannelEntity);
        postEntities.forEach(post -> post.setTopic(savedChannelEntity.getTopics().get(0)));

        postRepository.saveAll(postEntities);
    }

    private ChannelEntity findChannelEntityById(UUID channelId) {

        return channelRepository.findById(channelId)
                .orElseThrow(() -> {
                    String message = format("Could not find channel by id: [%s].", channelId);
                    return new NotFoundException(message);
                });
    }

    private void validateUserHasAccessToChannel(ChannelEntity channelEntity, UUID currentUser) {

        if (!currentUser.equals(channelEntity.getOwnerId())) {
            throw new UnauthorizedAccessException("Access denied.");
        }
    }

}
