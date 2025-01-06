package com.apostraph.apostraphbe.mapper;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.Subscription;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.SubscriptionEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    @Mapping(source = "userEntity", target = "userId", qualifiedByName = "userId")
    @Mapping(source = "channelEntity", target = "channel", qualifiedByName = "channel")
    @Mapping(source = "topicEntity", target = "topic", qualifiedByName = "topic")
    Subscription mapToDto(SubscriptionEntity subscriptionEntity);

    @Named("userId")
    static UUID userId(UserEntity userEntity) {

        return userEntity.getUserId();
    }

    @Named("channel")
    static Channel channel(ChannelEntity channelEntity) {

        return Channel.builder()
                .channelId(channelEntity.getChannelId())
                .name(channelEntity.getName())
                .description(channelEntity.getDescription())
                .avatar(channelEntity.getAvatar())
                .build();
    }

    @Named("topic")
    static Topic topic(TopicEntity topicEntity) {

        return topicEntity == null ? null : Topic.builder()
                .topicId(topicEntity.getTopicId())
                .name(topicEntity.getName())
                .description(topicEntity.getDescription())
                .build();
    }

}
