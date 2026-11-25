package com.apostraph.apostraphbe.repository;

import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.PostEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<PostEntity, UUID> {

    List<PostEntity> findAllByChannel(ChannelEntity channel);

    List<PostEntity> findAllByChannelAndTopic(ChannelEntity channel, TopicEntity topic);

}
