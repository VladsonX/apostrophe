package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.Post;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class PostValidator {

    public void validate(Post post) {

        requireExistsAndNotLongerThan(post.getTitle(), 200, "Title", true);
        requireExistsAndNotLongerThan(post.getContent(), 10000, "Content", true);
        requireExistsAndNotLongerThan(post.getPostSnippet(), 300, "Post snippet", false);
        requireExistsAndNotLongerThan(post.getThumbnailAltText(), 200, "Thumbnail alt text", false);
    }

    private void requireExistsAndNotLongerThan(String value, int maxLength, String fieldName, boolean required) {

        if (!required && value == null) {
            return;
        }

        if (StringUtils.isBlank(value)) {
            String message = String.format("%s must not be blank.", fieldName);
            throw new IllegalArgumentException(message);
        }

        if (value.length() > maxLength) {
            String message = String.format("%s must not be longer than %d.", fieldName, maxLength);
            throw new IllegalArgumentException(message);
        }
    }

}
