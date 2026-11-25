package com.apostraph.apostraphbe.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3ClientBuilder;

import java.net.URI;

@Configuration
public class S3Configuration {

    @Bean
    public AwsBasicCredentials awsBasicCredentials(
            @Value("${s3.access.key}") String accessKey,
            @Value("${s3.secret.key}") String secretKey
    ) {

        return AwsBasicCredentials.create(accessKey, secretKey);
    }

    @Bean
    public S3Client s3Client(
            @Value("${s3.region.name}") String region,
            @Value("${s3.endpoint:}") String endpoint,
            AwsBasicCredentials credentials
    ) {

        S3ClientBuilder builder = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials));

        // Optional custom endpoint for S3-compatible storage (e.g. Cloudflare R2).
        if (!endpoint.isBlank()) {
            builder.endpointOverride(URI.create(endpoint));
        }

        return builder.build();
    }

}
