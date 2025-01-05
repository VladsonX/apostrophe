package com.apostraph.apostraphbe.service.channel;

import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.exception.NameConflictException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicValidator {

    public void validateTopic(Topic topic) {

        if (StringUtils.isBlank(topic.getName()) || topic.getName().length() > 50) {
            throw new IllegalArgumentException("Topic name is invalid");
        }

        if (StringUtils.isBlank(topic.getDescription()) || topic.getDescription().length() > 1000) {
            throw new IllegalArgumentException("Description is invalid");
        }
    }

    public void validateTopicNameIsAvailable(Topic topic, List<TopicEntity> existingTopics) {

        String topicName = topic.getName();

        if (existingTopics.stream().anyMatch(t -> topicName.equals(t.getName()))) {
            throw new NameConflictException("Topic with this name already exist.");
        }
    }

}
