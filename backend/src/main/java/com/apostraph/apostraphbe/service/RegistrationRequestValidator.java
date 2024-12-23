package com.apostraph.apostraphbe.service;

import com.apostraph.apostraphbe.dto.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class RegistrationRequestValidator {

    private final EmailValidator emailValidator;

    public void validateRequest(RegistrationRequest registrationRequest) {

        validateEmail(registrationRequest.getEmail());
        validatePassword(registrationRequest.getPassword());
        validateName(registrationRequest.getName(), true);
        validateName(registrationRequest.getSurname(), false);
    }

    private void validateEmail(String email) {

        if (StringUtils.isBlank(email)) {
            throw new IllegalArgumentException("Email can not be empty.");
        }

        if (!emailValidator.isValid(email)) {
            throw new IllegalArgumentException("Email is not valid.");
        }
    }

    private void validatePassword(String password) {

        if (StringUtils.isBlank(password)) {
            throw new IllegalArgumentException("Password can not be null");
        }

        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must contain at least 8 characters.");
        }
    }

    private void validateName(String name, boolean required) {

        if (isNull(name) && !required) {
            return;
        }

        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Name/Surname can not be empty.");
        }

        if (name.length() > 15) {
            throw new IllegalArgumentException("Name/Surname is too long.");
        }
    }

}
