package com.example.exp7.demo;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/public/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "message", "Public endpoint accessible without JWT"
        );
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping("/user/profile")
    public Map<String, Object> userProfile(Authentication authentication) {
        return Map.of(
                "message", "User profile secured with role check",
                "user", authentication.getName(),
                "authorities", authentication.getAuthorities().stream().map(Object::toString).toList()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dashboard")
    public Map<String, Object> adminDashboard(Authentication authentication) {
        return Map.of(
                "message", "Admin dashboard secured via @PreAuthorize",
                "admin", authentication.getName()
        );
    }
}