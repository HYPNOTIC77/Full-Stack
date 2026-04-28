package com.example.exp6.controller;

import com.example.exp6.model.AppUser;
import com.example.exp6.model.Category;
import com.example.exp6.model.Product;
import com.example.exp6.repository.CategoryRepository;
import com.example.exp6.repository.ProductRepository;
import com.example.exp6.repository.UserRepository;
import com.example.exp6.service.ProductQueryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductQueryService productQueryService;

    public DemoController(ProductRepository productRepository,
                          UserRepository userRepository,
                          CategoryRepository categoryRepository,
                          ProductQueryService productQueryService) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productQueryService = productQueryService;
    }

    @GetMapping("/products/jpql")
    public Page<Map<String, Object>> productsByPriceJPQL(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = Sort.by("desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy);
        Page<Product> products = productRepository.findByPriceRange(min, max, PageRequest.of(page, size, sort));
        return products.map(this::toProductView);
    }

    @GetMapping("/products/criteria")
    public Page<Map<String, Object>> productsByPriceCriteria(
            @RequestParam(required = false) BigDecimal min,
            @RequestParam(required = false) BigDecimal max,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Page<Product> products = productQueryService.findProductsByCriteria(min, max, page, size, sortBy, direction);
        return products.map(this::toProductView);
    }

    @GetMapping("/users/by-role")
    public Page<Map<String, Object>> usersByRole(
            @RequestParam String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Page<AppUser> users = userRepository.findUsersByRole(role, PageRequest.of(page, size));
        return users.map(user -> Map.of(
                "id", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail(),
                "roles", user.getRoles().stream().map(r -> r.getName()).toList()
        ));
    }

    @GetMapping("/categories/{id}/products")
    public List<Map<String, Object>> getCategoryProducts(@PathVariable Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        return category.getProducts().stream()
                .map(this::toProductView)
                .toList();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "module", "exp6-jpa-demo");
    }

    private Map<String, Object> toProductView(Product p) {
        return Map.of(
                "id", p.getId(),
                "name", p.getName(),
                "price", p.getPrice(),
                "category", p.getCategory().getName()
        );
    }
}
