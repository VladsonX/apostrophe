package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.exception.NameConflictException;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.exception.UnauthorizedAccessException;
import com.apostraph.apostraphbe.mapper.TopicMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.apostraph.apostraphbe.util.TargetSystemUtils.validateTargetSystem;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicMapper topicMapper;
    private final ChannelRepository channelRepository;

    public void appendTopic(UUID channelId, Topic topic, AuthenticatedRequestProperties properties) {

        validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        ChannelEntity channelEntity = findChannelEntityById(channelId);
        validateUserCanAccessChannel(channelEntity, properties.getUserId());

        validateTopicModeIsEnabled(channelEntity);

        validateTopic(topic);
        validateTopicNameIsAvailable(topic, channelEntity.getTopics());

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

    private void validateTopic(Topic topic) {

        if (StringUtils.isBlank(topic.getName()) || topic.getName().length() > 50) {
            throw new IllegalArgumentException("Topic name is invalid");
        }

        if (StringUtils.isBlank(topic.getDescription()) || topic.getDescription().length() > 1000) {
            throw new IllegalArgumentException("Description is invalid");
        }
    }

    private void validateTopicNameIsAvailable(Topic topic, List<TopicEntity> existingTopics) {

        String topicName = topic.getName();

        if (existingTopics.stream().anyMatch(t -> topicName.equals(t.getName()))) {
            throw new NameConflictException("Topic with this name already exist.");
        }
    }

    private void validateTopicModeIsEnabled(ChannelEntity channelEntity) {

        if (!channelEntity.getTopicsEnabled()) {
            throw new IllegalArgumentException("Topics are not enabled in parent channel.");
        }
    }

}
