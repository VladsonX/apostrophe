package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.Post;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import com.apostraph.apostraphbe.service.LatestPostsService;
import com.apostraph.apostraphbe.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;
    private final LatestPostsService latestPostsService;

    @PostMapping
    public Post createPost(
            @RequestBody Post post,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Creating post.");
        return postService.createPost(post, properties);
    }

    @PatchMapping
    public Post updatePost(
            @RequestBody Post post,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Updating post.");
        return postService.updatePost(post, properties);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(
            @PathVariable UUID postId,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Deleting post by id: [{}].", postId);
        postService.deletePost(postId, properties);
    }

    @GetMapping
    public List<Post> getPosts(@RequestParam UUID channelId, @RequestParam(required = false) UUID topicId, @RequestParam int from, @RequestParam int to) {

        log.info("Getting posts by channel id: [{}] and topic id: [{}].", channelId, topicId);
        return postService.getPosts(channelId, topicId, from, to);
    }

    @GetMapping("/{postId}")
    public Post getPost(@PathVariable UUID postId) {

        log.info("Getting post by id: [{}].", postId);
        return postService.getPost(postId);
    }

    @GetMapping("/latest")
    public List<Post> getLatestPosts(
            @RequestParam Integer from,
            @RequestParam Integer to,
            @RequestAttribute("properties") AuthenticatedRequestProperties properties
    ) {

        log.info("Getting latest posts.");
        return latestPostsService.getLatestPosts(from, to, properties);
    }

}
