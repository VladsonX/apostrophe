package com.apostraph.apostraphbe.service;

import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

@Service
public class PostEstimatedReadTimeCalculator {

    private static final int WORDS_PER_MINUTE = 200;

    public long calculate(String content) {

        String[] words = extractTextFromHtml(content).split("\\s+");
        int wordCount = words.length;
        return (long) Math.ceil((double) wordCount * 60 / WORDS_PER_MINUTE);
    }

    private String extractTextFromHtml(String html) {
        return Jsoup.parse(html).text();
    }

}
