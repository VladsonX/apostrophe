package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.LoginRequest;
import com.apostraph.apostraphbe.dto.LoginResponse;
import com.apostraph.apostraphbe.entity.EmailVerificationRequestEntity;
import com.apostraph.apostraphbe.entity.UserEntity;
import com.apostraph.apostraphbe.repository.EmailVerificationRequestRepository;
import com.apostraph.apostraphbe.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserLoginService {

    private static final IllegalArgumentException LOGIN_ERROR = new IllegalArgumentException("Failed to login.");

    private final Key jwtKey;
    private final UserRepository userRepository;
    private final EmailVerificationRequestRepository emailVerificationRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse processLoginRequest(LoginRequest loginRequest) {

        UserEntity userEntity = findUserByEmail(loginRequest.getEmail());

        validateEmailVerified(userEntity.getUserId());
        validatePassword(loginRequest.getPassword(), userEntity);

        String jwtToken = generateJwtToken(loginRequest, userEntity);

        return LoginResponse.builder()
                .jwt(jwtToken)
                .build();
    }

    private UserEntity findUserByEmail(String email) {

        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> LOGIN_ERROR);
    }

    private void validateEmailVerified(UUID userId) {

        EmailVerificationRequestEntity request = emailVerificationRequestRepository.findByUserId(userId)
                .orElseThrow(() -> LOGIN_ERROR);

        if (!request.getAccepted()) {
            throw LOGIN_ERROR;
        }
    }

    private void validatePassword(String password, UserEntity userEntity) {

        if (!passwordEncoder.matches(password, userEntity.getPassword())) {
            throw new IllegalArgumentException("Incorrect credentials.");
        }
    }

    private String generateJwtToken(LoginRequest loginRequest, UserEntity userEntity) {

        return Jwts.builder()
                .setSubject(userEntity.getUserId().toString()) // Subject
                .setIssuer("SERVER") // Issuer of the token
                .setIssuedAt(new Date()) // Issue time
                .setExpiration(new Date(System.currentTimeMillis() + 3600000 * 168))
                .claim("system", loginRequest.getTargetSystem().toString())
                .signWith(jwtKey) // Signing the token
                .compact();
    }

}
