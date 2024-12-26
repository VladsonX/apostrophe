package com.apostraph.apostraphbe.util;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import com.apostraph.apostraphbe.exception.InvalidTargetSystemException;
import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TargetSystemUtils {

    public static void validateTargetSystem(AuthenticatedRequestProperties properties, LoginTargetSystem targetSystem) {

        LoginTargetSystem actualTargetSystem = properties.getLoginTargetSystem();

        if (actualTargetSystem == null) {
            throw new IllegalArgumentException("No target system specified in the request.");
        }

        if (actualTargetSystem != targetSystem) {
            throw new InvalidTargetSystemException("Incorrect target system. Please, re-login.");
        }
    }

}
