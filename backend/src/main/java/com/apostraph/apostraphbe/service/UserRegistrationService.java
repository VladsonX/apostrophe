package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.RegistrationRequest;
import com.apostraph.apostraphbe.entity.EmailVerificationRequestEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import com.apostraph.apostraphbe.repository.EmailVerificationRequestRepository;
import com.apostraph.apostraphbe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

import static java.lang.String.format;
import static org.apache.commons.codec.digest.DigestUtils.sha256Hex;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final Clock javaClock;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationRequestValidator registrationRequestValidator;
    private final EmailVerificationRequestRepository emailVerificationRequestRepository;

    @Transactional
    public void processRegistrationRequest(RegistrationRequest registrationRequest) {

        registrationRequestValidator.validateRequest(registrationRequest);
        userRepository.findUserByEmail(registrationRequest.getEmail())
                .ifPresentOrElse(
                        user -> processRegistrationRetry(user, registrationRequest),
                        () -> processRegistration(registrationRequest)
                );
    }

    private void processRegistration(RegistrationRequest request) {

        UserEntity userEntity = buildUserEntityFromRegistrationRequest(request);
        UserEntity savedUserEntity = userRepository.save(userEntity);

        storeEmailVerificationRequest(savedUserEntity.getUserId());
    }

    private void processRegistrationRetry(UserEntity existingUser, RegistrationRequest registrationRequest) {

        UUID userId = existingUser.getUserId();
        EmailVerificationRequestEntity emailVerificationRequest = findEmailVerificationRequest(userId);

        if (emailVerificationRequest.getAccepted()) {
            throw new IllegalArgumentException("Email is not available for registration. Please, try sing-in.");
        }

        emailVerificationRequestRepository.delete(emailVerificationRequest);
        storeEmailVerificationRequest(userId);

        updateUserEntityFromRegistrationRequest(existingUser, registrationRequest);
        setRegistrationTimestamp(existingUser);

        userRepository.save(existingUser);
    }

    private void updateUserEntityFromRegistrationRequest(UserEntity existingUser, RegistrationRequest request) {

        existingUser.setName(request.getName());
        existingUser.setSurname(request.getSurname());
    }

    private void setRegistrationTimestamp(UserEntity userEntity) {

        LocalDateTime timestamp = LocalDateTime.now(javaClock);
        userEntity.setRegistrationTimestamp(timestamp);
    }

    private EmailVerificationRequestEntity findEmailVerificationRequest(UUID userId) {

        return emailVerificationRequestRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    String message = format("No verification request found for user: [%s].", userId);
                    return new IllegalStateException(message);
                });
    }

    private void storeEmailVerificationRequest(UUID userId) {

        EmailVerificationRequestEntity request = EmailVerificationRequestEntity.builder()
                .userId(userId)
                .accepted(false)
                .validUntil(LocalDateTime.now(javaClock).plusDays(1))
                .hash(sha256Hex(UUID.randomUUID().toString()))
                .build();

        emailVerificationRequestRepository.save(request);
    }

    private UserEntity buildUserEntityFromRegistrationRequest(RegistrationRequest request) {

        return UserEntity.builder()
                .email(request.getEmail())
                .name(request.getName())
                .surname(request.getSurname())
                .registrationTimestamp(LocalDateTime.now(javaClock))
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
    }
}
