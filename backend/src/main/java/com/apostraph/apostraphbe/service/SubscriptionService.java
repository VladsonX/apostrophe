package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Subscription;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.SubscriptionEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.mapper.SubscriptionMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.repository.SubscriptionRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.util.TargetSystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final ChannelRepository channelRepository;
    private final SubscriptionMapper subscriptionMapper;

    @Transactional
    public Subscription createSubscription(Subscription subscription, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.READER);
        validateSubscription(subscription);
        validateNotAlreadyCreated(subscription, properties.getUserId());

        ChannelEntity channelEntity = channelRepository.findById(subscription.getChannel().getChannelId())
                .orElseThrow(() -> new NotFoundException("Could not find channel."));

        TopicEntity topicEntity = subscription.getTopic() == null ? null : channelEntity.getTopics()
                .stream()
                .filter(t -> subscription.getTopic().getTopicId().equals(t.getTopicId()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Topic not found."));

        SubscriptionEntity subscriptionEntity = SubscriptionEntity.builder()
                .userEntity(UserEntity.builder()
                        .userId(properties.getUserId())
                        .build())
                .channelEntity(channelEntity)
                .topicEntity(topicEntity)
                .build();

        SubscriptionEntity savedSubscriptionEntity = subscriptionRepository.save(subscriptionEntity);
        return subscriptionMapper.mapToDto(savedSubscriptionEntity);
    }

    public List<Subscription> getSubscriptions(AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.READER);

        return subscriptionRepository.findByUserEntity(UserEntity.builder().userId(properties.getUserId()).build())
                .stream().map(subscriptionMapper::mapToDto)
                .toList();
    }

    @Transactional
    public void deleteSubscription(UUID channelId, UUID topicId, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.READER);

        UserEntity userEntity = UserEntity.builder()
                .userId(properties.getUserId())
                .build();

        List<SubscriptionEntity> subscriptionEntities = subscriptionRepository.findByUserEntity(userEntity)
                .stream()
                .filter(s -> channelId.equals(s.getChannelEntity().getChannelId()))
                .toList();

        if (subscriptionEntities.size() == 1
                && subscriptionEntities.get(0).getTopicEntity() == null
                && topicId != null) {

            ChannelEntity channelEntity = subscriptionEntities.get(0).getChannelEntity();

            List<SubscriptionEntity> subscriptionEntitiesToCreate = channelEntity.getTopics()
                    .stream()
                    .filter(topicEntity -> !topicId.equals(topicEntity.getTopicId()))
                    .map(topicEntity -> SubscriptionEntity.builder()
                            .userEntity(userEntity)
                            .channelEntity(channelEntity)
                            .topicEntity(topicEntity)
                            .build())
                    .collect(Collectors.toList());

            subscriptionRepository.delete(subscriptionEntities.get(0));
            subscriptionRepository.saveAll(subscriptionEntitiesToCreate);

        } else if (topicId == null) {

            subscriptionRepository.deleteAll(subscriptionEntities);

        } else {

            List<SubscriptionEntity> subscriptionEntitiesToDelete = subscriptionEntities.stream()
                    .filter(s -> topicId.equals(s.getTopicEntity().getTopicId()))
                    .collect(Collectors.toList());

            subscriptionRepository.deleteAll(subscriptionEntitiesToDelete);
        }
    }

    private void validateSubscription(Subscription subscription) {

        if (subscription.getChannel() == null || subscription.getChannel().getChannelId() == null) {
            throw new IllegalArgumentException("Channel id is missing");
        }
    }

    private void validateNotAlreadyCreated(Subscription subscription, UUID currentUser) {

        Topic topic = subscription.getTopic();

        Optional<SubscriptionEntity> subscriptionEntity =
                subscriptionRepository.findByChannelEntityAndTopicEntityAndUserEntity(
                        ChannelEntity.builder().channelId(subscription.getChannel().getChannelId()).build(),
                        topic == null ? null : TopicEntity.builder().topicId(topic.getTopicId()).build(),
                        UserEntity.builder().userId(currentUser).build()
                );

        if (subscriptionEntity.isPresent()) {
            throw new IllegalArgumentException("Subscription already exists.");
        }
    }

}
