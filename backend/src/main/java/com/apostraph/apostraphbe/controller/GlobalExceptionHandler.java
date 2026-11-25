package com.apostraph.apostraphbe.controller;

import com.apostraph.apostraphbe.dto.ErrorMessage;
import com.apostraph.apostraphbe.exception.InvalidTargetSystemException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Clock;
import java.time.LocalDateTime;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final Clock javaClock;

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handle400Exception(Exception exception) {

        return handleException(exception, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTargetSystemException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleInvalidTargetSystemException(InvalidTargetSystemException e) {

        return handleException(e, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleException(Exception exception) {

        return handleException(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ErrorMessage handleException(Exception e, HttpStatus httpStatus) {

        log.error("An exception occurred: [{}].", e.getMessage(), e);
        return ErrorMessage.builder()
                .message(e.getMessage())
                .status(httpStatus.value())
                .timestamp(LocalDateTime.now(javaClock))
                .build();
    }

}
