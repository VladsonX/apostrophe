package com.apostraph.apostraphbe.service;

import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PostEstimatedReadTimeCalculator {

    private static final int WORDS_PER_MINUTE = 200;

    public long calculate(String content) {

        String[] words = extractTextFromHtml(content).split("\\s+");
        System.out.println(Arrays.toString(words));
        int wordCount = words.length;
        return (long) Math.ceil((double) wordCount * 60 / WORDS_PER_MINUTE);
    }

    private String extractTextFromHtml(String html) {
        String text = Jsoup.parse(html).text();
        System.out.println(text);
        return Jsoup.parse(html).text();
    }

}
