package com.apostraph.apostraphbe.mapper;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {TopicMapper.class})
public interface ChannelMapper {

    @Mapping(target = "channelId", ignore = true)
    @Mapping(target = "ownerId", ignore = true)
    @Mapping(target = "topics", ignore = true)
    ChannelEntity mapToEntity(Channel channel);

    @Mapping(target = "topics", source = "topics")
    Channel mapToDto(ChannelEntity channelEntity);

}
