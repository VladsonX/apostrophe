package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final S3Client s3Client;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

    public String createMedia(MultipartFile file) {

        UUID key = UUID.randomUUID();
        s3Client.putObject(buildPutRequest(key, file), RequestBody.fromBytes(getBytes(file)));
        return key.toString();
    }

    public ResponseEntity<byte[]> getMedia(UUID key) {

        try {

            ResponseInputStream<GetObjectResponse> s3ObjectStream = s3Client.getObject(buildGetRequest(key));

            byte[] imageBytes = s3ObjectStream.readAllBytes();

            String contentType = s3ObjectStream.response().contentType() != null
                    ? s3ObjectStream.response().contentType()
                    : "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageBytes);

        } catch (NoSuchKeyException | IOException e) {
            String message = String.format("Could not find media by path: [%s].", key);
            throw new NotFoundException(message, e);
        }

    }

    private PutObjectRequest buildPutRequest(UUID key, MultipartFile file) {

        return PutObjectRequest.builder()
                .bucket(s3BucketName)
                .key(key.toString())
                .contentType(file.getContentType())
                .build();
    }

    public GetObjectRequest buildGetRequest(UUID key) {

        return GetObjectRequest.builder()
                .bucket(s3BucketName)
                .key(key.toString())
                .build();
    }

    private byte[] getBytes(MultipartFile file) {

        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
