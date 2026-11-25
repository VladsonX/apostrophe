package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Post;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.PostEntity;
import com.apostraph.apostraphbe.entity.SubscriptionEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import com.apostraph.apostraphbe.mapper.PostMapper;
import com.apostraph.apostraphbe.repository.PostRepository;
import com.apostraph.apostraphbe.repository.SubscriptionRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.util.TargetSystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class LatestPostsService {

    private final SubscriptionRepository subscriptionRepository;
    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public List<Post> getLatestPosts(int from, int to, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.READER);

        UserEntity userEntity = UserEntity.builder()
                .userId(properties.getUserId())
                .build();

        List<SubscriptionEntity> subscriptionEntities = subscriptionRepository.findByUserEntity(userEntity);

        return subscriptionEntities.stream()
                .flatMap(this::getPostsBySubscription)
                .sorted(Comparator.comparing(PostEntity::getCreatedAt, Comparator.reverseOrder()))
                .skip(from)
                .limit(to)
                .map(postMapper::mapToDto)
                .toList();
    }

    public List<Post> getExplorePosts(int limit, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.READER);

        UserEntity userEntity = UserEntity.builder()
                .userId(properties.getUserId())
                .build();

        List<SubscriptionEntity> subscriptionEntities = subscriptionRepository.findByUserEntity(userEntity);
        Set<UUID> subscribedChannelIds = subscriptionEntities.stream()
                .map(SubscriptionEntity::getChannelEntity)
                .map(ChannelEntity::getChannelId)
                .collect(Collectors.toSet());

        List<PostEntity> postEntities = postRepository.findAll();
        Collections.shuffle(postEntities);

        return postEntities
                .stream()
                .filter(post -> !subscribedChannelIds.contains(post.getChannel().getChannelId()))
                .limit(limit)
                .map(postMapper::mapToDto)
                .toList();
    }

    private Stream<PostEntity> getPostsBySubscription(SubscriptionEntity subscriptionEntity) {

        return postRepository.findAllByChannel(subscriptionEntity.getChannelEntity())
                .stream()
                .filter(subscriptionEntity.getTopicEntity() == null
                        ? p -> true
                        : p -> subscriptionEntity.getTopicEntity().getTopicId()
                        .equals(p.getTopic().getTopicId())
                );
    }

}
