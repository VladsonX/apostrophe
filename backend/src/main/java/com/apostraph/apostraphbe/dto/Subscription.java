package com.apostraph.apostraphbe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Subscription {

    private UUID subscriptionId;
    private UUID userId;
    private Channel channel;
    private Topic topic;

}
