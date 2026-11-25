package com.apostraph.apostraphbe.mapper;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.Post;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.PostEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "channel", target = "channel", qualifiedByName = "channel")
    @Mapping(source = "topic", target = "topic", qualifiedByName = "topic")
    Post mapToDto(PostEntity postEntity);

    @Mapping(target = "postId", ignore = true)
    @Mapping(target = "channel", ignore = true)
    @Mapping(target = "topic", ignore = true)
    PostEntity mapToEntity(Post post);

    @Mapping(target = "postId", ignore = true)
    @Mapping(target = "channel", ignore = true)
    @Mapping(target = "topic", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromDto(Post post, @MappingTarget PostEntity postEntity);

    @Named("channel")
    static Channel channel(ChannelEntity channelEntity) {

        return Channel.builder()
                .channelId(channelEntity.getChannelId())
                .name(channelEntity.getName())
                .avatar(channelEntity.getAvatar())
                .build();
    }

    @Named("topic")
    static Topic topic(TopicEntity topicEntity) {

        return topicEntity == null ? null : Topic.builder()
                .topicId(topicEntity.getTopicId())
                .name(topicEntity.getName())
                .build();
    }

}
