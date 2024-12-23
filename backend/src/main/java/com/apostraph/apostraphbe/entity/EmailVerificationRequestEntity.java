package com.apostraph.apostraphbe.entity;

import jakarta.persistence.Entity;
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
@Entity
public class EmailVerificationRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID requestId;
    private UUID userId;
    private String hash;
    private Boolean accepted;
    private LocalDateTime validUntil;

}
