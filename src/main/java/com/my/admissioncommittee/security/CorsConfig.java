package com.my.admissioncommittee.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/logIn")
                .allowedOrigins("http://localhost:3000") // Replace with your React app's origin
                .allowedMethods("GET", "POST", "OPTIONS") // Specify the allowed HTTP methods
                .allowedHeaders("Content-Type", "Authorization") // Specify the allowed request headers
                .allowCredentials(true); // Allow including credentials (e.g., cookies) in the request
    }
}
