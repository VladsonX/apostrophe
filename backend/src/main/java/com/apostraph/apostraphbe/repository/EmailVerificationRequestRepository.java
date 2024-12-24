package com.apostraph.apostraphbe.repository;

import com.apostraph.apostraphbe.entity.EmailVerificationRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationRequestRepository extends JpaRepository<EmailVerificationRequestEntity, UUID> {

    Optional<EmailVerificationRequestEntity> findByUserId(UUID userId);

    Optional<EmailVerificationRequestEntity> findByHash(String hash);

}
