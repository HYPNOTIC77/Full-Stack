package com.example.exp7.user;

import java.util.Set;

public class AppUser {

    private final String username;
    private final String encodedPassword;
    private final Set<AppRole> roles;

    public AppUser(String username, String encodedPassword, Set<AppRole> roles) {
        this.username = username;
        this.encodedPassword = encodedPassword;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public Set<AppRole> getRoles() {
        return roles;
    }
}
