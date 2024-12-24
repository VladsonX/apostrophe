package com.apostraph.apostraphbe.security;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatedRequestProperties {

    private UUID userId;
    private LoginTargetSystem loginTargetSystem;

}
