package com.apostraph.apostraphbe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Channel {

    private UUID channelId;
    private String name;
    private String description;
    private UUID avatar;
    private Boolean topicsEnabled;
    private UUID ownerId;
    private List<Topic> topics;

}
