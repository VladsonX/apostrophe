package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.Channel;
import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.dto.Post;
import com.apostraph.apostraphbe.dto.Topic;
import com.apostraph.apostraphbe.entity.ChannelEntity;
import com.apostraph.apostraphbe.entity.PostEntity;
import com.apostraph.apostraphbe.entity.TopicEntity;
import com.apostraph.apostraphbe.exception.NotFoundException;
import com.apostraph.apostraphbe.mapper.PostMapper;
import com.apostraph.apostraphbe.repository.ChannelRepository;
import com.apostraph.apostraphbe.repository.PostRepository;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.util.TargetSystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final ChannelRepository channelRepository;
    private final PostMapper postMapper;
    private final PostEstimatedReadTimeCalculator postEstimatedReadTimeCalculator;
    private final PostValidator postValidator;
    private final Clock javaClock;

    @Transactional
    public Post createPost(Post post, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        ChannelEntity channel = getChannel(post, properties.getUserId());
        TopicEntity topic = channel.getTopicsEnabled() ? getTopic(post, channel) : null;

        if (channel.getTopicsEnabled() && topic == null) {
            throw new IllegalArgumentException("Post must be assigned to topic.");
        }

        postValidator.validate(post);

        PostEntity postEntity = postMapper.mapToEntity(post);
        postEntity.setChannel(channel);
        postEntity.setTopic(topic);

        LocalDateTime now = LocalDateTime.now(javaClock);

        postEntity.setCreatedAt(now);
        postEntity.setLastModifiedAt(now);

        long estimatedReadingTime = postEstimatedReadTimeCalculator.calculate(post.getContent());
        postEntity.setEstimatedReadingTime(estimatedReadingTime);

        PostEntity savedPostEntity = postRepository.save(postEntity);
        return postMapper.mapToDto(savedPostEntity);
    }

    @Transactional
    public Post updatePost(Post post, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        PostEntity postEntity = postRepository.findById(post.getPostId())
                .map(e -> {
                    ChannelEntity channelEntity = e.getChannel();
                    UUID currentUser = properties.getUserId();
                    return currentUser.equals(channelEntity.getOwnerId()) ? e : null;
                })
                .orElseThrow(() -> new NotFoundException("Post not found."));

        postValidator.validate(post);
        postMapper.updateEntityFromDto(post, postEntity);

        if (postEntity.getChannel().getTopicsEnabled() && post.getTopic() != null) {
            TopicEntity topicEntity = getTopic(post, postEntity.getChannel());
            postEntity.setTopic(topicEntity);
        }

        long estimatedReadingTime = postEstimatedReadTimeCalculator.calculate(postEntity.getContent());
        postEntity.setEstimatedReadingTime(estimatedReadingTime);

        postEntity.setLastModifiedAt(LocalDateTime.now(javaClock));

        PostEntity savedPostEntity = postRepository.save(postEntity);
        return postMapper.mapToDto(savedPostEntity);
    }

    @Transactional
    public void deletePost(UUID postId, AuthenticatedRequestProperties properties) {

        TargetSystemUtils.validateTargetSystem(properties, LoginTargetSystem.STUDIO);

        PostEntity postEntity = postRepository.findById(postId)
                .map(e -> {
                    ChannelEntity channelEntity = e.getChannel();
                    UUID currentUser = properties.getUserId();
                    return currentUser.equals(channelEntity.getOwnerId()) ? e : null;
                })
                .orElseThrow(() -> new NotFoundException("Post not found."));

        postRepository.delete(postEntity);
    }

    public List<Post> getPosts(UUID channelId, UUID topicId, int from, int to) {

        List<PostEntity> foundPosts = topicId == null
                ? postRepository.findAllByChannel(buildChannel(channelId))
                : postRepository.findAllByChannelAndTopic(buildChannel(channelId), buildTopic(topicId));

        return foundPosts.stream()
                .sorted(Comparator.comparing(PostEntity::getCreatedAt))
                .skip(from)
                .limit(to)
                .map(postMapper::mapToDto)
                .toList();
    }

    public Post getPost(UUID postId) {

        return postRepository.findById(postId)
                .map(postMapper::mapToDto)
                .orElseThrow(() -> new NotFoundException("Post not found."));
    }

    private ChannelEntity getChannel(Post post, UUID currentUser) {

        UUID channelId = Optional.ofNullable(post.getChannel())
                .map(Channel::getChannelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel id is null."));

        return channelRepository.findById(channelId)
                .map(channelEntity -> currentUser.equals(channelEntity.getOwnerId()) ? channelEntity : null)
                .orElseThrow(() -> new NotFoundException("Channel not found."));
    }

    private TopicEntity getTopic(Post post, ChannelEntity channelEntity) {

        return Optional.ofNullable(post.getTopic())
                .map(Topic::getTopicId)
                .map(topicId -> channelEntity.getTopics()
                        .stream()
                        .filter(topic -> topicId.equals(topic.getTopicId()))
                        .findFirst()
                        .orElseThrow(() -> new NotFoundException("Topic not found.")))
                .orElse(null);
    }

    private ChannelEntity buildChannel(UUID channelId) {

        return ChannelEntity.builder()
                .channelId(channelId)
                .build();
    }

    private TopicEntity buildTopic(UUID topicId) {

        return TopicEntity.builder()
                .topicId(topicId)
                .build();
    }

}
