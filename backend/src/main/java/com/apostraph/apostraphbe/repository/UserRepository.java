package com.apostraph.apostraphbe.repository;

import com.apostraph.apostraphbe.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findUserByEmail(String email);

}
