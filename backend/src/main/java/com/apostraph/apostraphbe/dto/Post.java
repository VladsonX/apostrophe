package com.apostraph.apostraphbe.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID postId;
    private String content;
    private String postSnippet;
    private String title;
    private UUID thumbnail;
    private String thumbnailAltText;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private Long estimatedReadingTime;
    private Channel channel;
    private Topic topic;

}
