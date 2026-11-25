package com.apostraph.apostraphbe.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

@Configuration
public class ClockConfiguration {

    @Bean
    public Clock javaClock() {
        return Clock.systemUTC();
    }

}
