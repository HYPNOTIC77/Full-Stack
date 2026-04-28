package com.example.exp8.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserStoreService implements UserDetailsService {

    private final Map<String, AppUser> users = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;

    public UserStoreService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        users.put("admin", new AppUser("admin", passwordEncoder.encode("admin123"), "ROLE_USER"));
    }

    public void register(String username, String rawPassword) {
        String normalizedUsername = username.trim().toLowerCase();
        if (users.containsKey(normalizedUsername)) {
            throw new IllegalArgumentException("Username already exists");
        }
        users.put(normalizedUsername, new AppUser(normalizedUsername, passwordEncoder.encode(rawPassword), "ROLE_USER"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalizedUsername = username.trim().toLowerCase();
        AppUser appUser = users.get(normalizedUsername);
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return appUser;
    }

    public static class AppUser implements UserDetails {
        private final String username;
        private final String password;
        private final String role;

        public AppUser(String username, String password, String role) {
            this.username = username;
            this.password = password;
            this.role = role;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority(role));
        }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public String getUsername() {
            return username;
        }
    }
}
