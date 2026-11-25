package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.tuple.Pair;
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

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import static java.lang.String.format;
import static java.util.Objects.requireNonNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {

    private static final String CONTENT_TYPE_POSTFIX = "-content-type";

    private final S3Client s3Client;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

    @Value("${local.media.storage.path}")
    private String localMediaStoragePath;

    public String createMedia(MultipartFile file) {

        UUID key = UUID.randomUUID();
        s3Client.putObject(buildPutRequest(key, file), RequestBody.fromBytes(getBytes(file)));
        log.info("PutObject request to S3 has been executed.");
        return key.toString();
    }

    public ResponseEntity<byte[]> getMedia(UUID key) {

        try {

            Pair<byte[], String> media = findLocally(key);

            if (media == null) {

                ResponseInputStream<GetObjectResponse> s3ObjectStream = s3Client.getObject(buildGetRequest(key));

                log.info("GetObject request to S3 has been executed.");

                media = Pair.of(
                        s3ObjectStream.readAllBytes(),
                        s3ObjectStream.response().contentType()
                );

                putLocally(key, media);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(media.getRight()))
                    .body(media.getLeft());

        } catch (NoSuchKeyException | IOException e) {
            String message = format("Could not find media by key: [%s].", key);
            throw new NotFoundException(message, e);
        }

    }

    private Pair<byte[], String> findLocally(UUID key) throws IOException {

        File directory = new File(localMediaStoragePath);
        directory.mkdirs();

        if (directory.exists() && directory.isDirectory()) {

            File[] matchingFiles = requireNonNull(
                    directory.listFiles((dir, name) -> name.contains(key.toString()))
            );

            if (matchingFiles.length == 0) {
                return null;
            }

            return Pair.of(
                    FileUtils.readFileToByteArray(getPayloadFile(matchingFiles)),
                    FileUtils.readFileToString(getContentTypeFile(matchingFiles), StandardCharsets.UTF_8)
            );
        }

        throw new IllegalStateException("Could not find cache dir.");
    }

    private void putLocally(UUID key, Pair<byte[], String> media) throws IOException {

        String filePath = format("%s/%s", localMediaStoragePath, key.toString());
        FileUtils.writeByteArrayToFile(new File(filePath), media.getLeft());
        FileUtils.write(new File(filePath + CONTENT_TYPE_POSTFIX), media.getRight(), StandardCharsets.UTF_8);
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

    private File getPayloadFile(File[] files) {

        for (File file : files) {
            try {
                UUID.fromString(file.getName());
                return file;
            } catch (IllegalArgumentException e) {
                // continue
            }
        }

        throw new IllegalStateException("Count not find payload file.");
    }

    private File getContentTypeFile(File[] files) {
        for (File file : files) {
            if (file.getName().contains(CONTENT_TYPE_POSTFIX)) {
                return file;
            }
        }

        throw new IllegalStateException("Could not find content type file");
    }

}
