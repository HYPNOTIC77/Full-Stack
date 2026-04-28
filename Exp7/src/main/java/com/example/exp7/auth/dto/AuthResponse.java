package com.example.exp7.auth.dto;

import java.util.List;

public class AuthResponse {

    private final String token;
    private final String tokenType;
    private final String username;
    private final List<String> roles;

    public AuthResponse(String token, String tokenType, String username, List<String> roles) {
        this.token = token;
        this.tokenType = tokenType;
        this.username = username;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }
}
