package com.apostraph.apostraphbe.repository;

import com.apostraph.apostraphbe.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChannelRepository extends JpaRepository<ChannelEntity, UUID> {

    List<ChannelEntity> findAllByOwnerId(UUID ownerId);

}
