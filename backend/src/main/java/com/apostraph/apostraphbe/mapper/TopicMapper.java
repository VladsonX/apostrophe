package com.apostraph.apostraphbe.mapper;

import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.TopicEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TopicMapper {

    @Mapping(target = "topicId", ignore = true)
    TopicEntity mapToEntity(Topic topic);

    Topic mapToDto(TopicEntity topicEntity);

}
