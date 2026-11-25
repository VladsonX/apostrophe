package com.apostraph.apostraphbe.configuration;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailValidatorConfiguration {

    @Bean
    public EmailValidator emailValidator() {

        return EmailValidator.getInstance();
    }

}
