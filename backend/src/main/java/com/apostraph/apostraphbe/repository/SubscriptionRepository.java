package com.apostraph.apostraphbe.repository;

import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.SubscriptionEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, UUID> {

    Optional<SubscriptionEntity> findByChannelEntityAndTopicEntityAndUserEntity(ChannelEntity channelEntity, TopicEntity topicEntity, UserEntity userEntity);

    List<SubscriptionEntity> findByUserEntity(UserEntity userEntity);

}
