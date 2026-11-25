package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.entity.EmailVerificationRequestEntity;
import com.apostraph.apostraphbe.repository.EmailVerificationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private static final IllegalArgumentException ERROR = new IllegalArgumentException("Error.");

    private final Clock javaClock;
    private final EmailVerificationRequestRepository emailVerificationRequestRepository;

    public void verifyEmail(String token) {

        EmailVerificationRequestEntity request = emailVerificationRequestRepository.findByHash(token)
                .orElseThrow(() -> ERROR);

        if (isRequestOutdated(request)) {
            throw ERROR;
        }

        request.setHash(null);
        request.setAccepted(true);

        emailVerificationRequestRepository.save(request);
    }

    private boolean isRequestOutdated(EmailVerificationRequestEntity request) {

        LocalDateTime now = LocalDateTime.now(javaClock);
        return now.isAfter(request.getValidUntil());
    }

}
