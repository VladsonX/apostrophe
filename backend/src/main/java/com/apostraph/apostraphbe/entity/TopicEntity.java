package com.apostraph.apostraphbe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID topicId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

}
