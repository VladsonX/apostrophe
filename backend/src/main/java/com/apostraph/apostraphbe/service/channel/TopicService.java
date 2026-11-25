package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.exception.UnauthorizedAccessException;
import com.apostraph.apostraphbe.mapper.TopicMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.apostraph.apostraphbe.util.TargetSystemUtils.validateTargetSystem;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicMapper topicMapper;
    private final ChannelRepository channelRepository;
    private final TopicValidator topicValidator;

    public void appendTopic(UUID channelId, Topic topic, AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        ChannelEntity channelEntity = findChannelEntityById(channelId);
        validateUserCanAccessChannel(channelEntity, properties.getUserId());

        validateTopicModeIsEnabled(channelEntity);

        topicValidator.validateTopic(topic);
        topicValidator.validateTopicNameIsAvailable(topic, channelEntity.getTopics());

        TopicEntity topicEntity = topicMapper.mapToEntity(topic);
        channelEntity.getTopics().add(topicEntity);

        channelRepository.save(channelEntity);
    }

    private ChannelEntity findChannelEntityById(UUID channelId) {

        return channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException("Could not find channel by id."));
    }

    private void validateUserCanAccessChannel(ChannelEntity channelEntity, UUID currentUser) {

        if (!currentUser.equals(channelEntity.getOwnerId())) {
            throw new UnauthorizedAccessException("Access denied.");
        }
    }

    private void validateTopicModeIsEnabled(ChannelEntity channelEntity) {

        if (!channelEntity.getTopicsEnabled()) {
            throw new IllegalArgumentException("Topics are not enabled in parent channel.");
        }
    }

}
