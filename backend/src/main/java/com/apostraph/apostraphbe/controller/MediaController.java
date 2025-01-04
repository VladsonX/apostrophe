package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @PostMapping
    public String createMedia(@RequestParam("file") MultipartFile file) {

        log.info("Putting media.");
        return mediaService.createMedia(file);
    }

    @GetMapping("/{key}")
    public ResponseEntity<byte[]> getMedia(@PathVariable UUID key) {

        log.info("Getting media by key: [{}].", key);
        return mediaService.getMedia(key);
    }

}
