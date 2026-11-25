package com.apostraph.apostraphbe.security;

import com.apostraph.apostraphbe.dto.LoginTargetSystem;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final String AUTH_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    private final Key jwtKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(AUTH_HEADER);

        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(TOKEN_PREFIX.length());

        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            Claims claims = extractClaims(jwt);

            AuthenticatedUser authenticatedUser = buildAuthenticatedUser(claims);

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    authenticatedUser, null, authenticatedUser.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            context.setAuthentication(authToken);
            SecurityContextHolder.setContext(context);

            request.setAttribute("properties", convertToProperties(authenticatedUser));
            filterChain.doFilter(request, response);
        }
    }

    private AuthenticatedUser buildAuthenticatedUser(Claims claims) {

        String userId = claims.getSubject();
        String targetSystem = claims.get("system", String.class);

        return AuthenticatedUser.builder()
                .userId(userId)
                .targetSystem(targetSystem)
                .build();
    }

    private Claims extractClaims(String jwt) {

        return Jwts.parserBuilder()
                .setSigningKey(jwtKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private AuthenticatedRequestProperties convertToProperties(AuthenticatedUser authenticatedUser) {

        return AuthenticatedRequestProperties.builder()
                .userId(UUID.fromString(authenticatedUser.getUserId()))
                .loginTargetSystem(LoginTargetSystem.valueOf(authenticatedUser.getTargetSystem()))
                .build();
    }

}
