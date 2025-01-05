package com.apostraph.apostraphbe.mapper;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {TopicMapper.class})
public interface ChannelMapper {

    @Mapping(target = "channelId", ignore = true)
    @Mapping(target = "ownerId", ignore = true)
    @Mapping(source = "topics", target = "topics", qualifiedByName = "topicEntities")
    ChannelEntity mapToEntity(Channel channel);

    @Mapping(target = "topics", source = "topics")
    Channel mapToDto(ChannelEntity channelEntity);

    @Named("topicEntities")
    static List<TopicEntity> topicEntities(List<Topic> topics) {

        return topics == null ? new ArrayList<>() : topics.stream()
                .map(topic -> TopicEntity.builder()
                        .name(topic.getName())
                        .description(topic.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

}
