package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.security.AuthenticatedRequestProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    private final S3Client s3Client;

    @GetMapping
    public String test(@RequestAttribute("properties") AuthenticatedRequestProperties user) {

        return "Hello!" + user.getUserId() + user.getLoginTargetSystem();
    }

    @GetMapping("/s3")
    public ResponseEntity<byte[]> testS3() throws IOException {

        ResponseInputStream<GetObjectResponse> s3ObjectStream = s3Client.getObject(
                GetObjectRequest.builder()
                        .bucket("aboba34505supadupabucket")
                        .key("wallhaven-wqqr6x.jpg")
                        .build()
        );

        byte[] imageBytes = s3ObjectStream.readAllBytes();

        String contentType = s3ObjectStream.response().contentType() != null
                ? s3ObjectStream.response().contentType()
                : "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + "wallhaven-wqqr6x.jpg" + "\"")
                .body(imageBytes);
    }

}
