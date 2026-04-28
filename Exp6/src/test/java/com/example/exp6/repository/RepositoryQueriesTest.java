package com.example.exp6.repository;

import com.example.exp6.model.AppUser;
import com.example.exp6.model.Category;
import com.example.exp6.model.Product;
import com.example.exp6.model.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class RepositoryQueriesTest {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setup() {
        Role admin = roleRepository.save(new Role("ADMIN"));
        Role customer = roleRepository.save(new Role("CUSTOMER"));

        AppUser user1 = new AppUser("Test Admin", "admin@test.com");
        user1.addRole(admin);
        user1.addRole(customer);

        AppUser user2 = new AppUser("Test Customer", "customer@test.com");
        user2.addRole(customer);

        userRepository.save(user1);
        userRepository.save(user2);

        Category electronics = new Category("Electronics");
        electronics.addProduct(new Product("Laptop", new BigDecimal("75000.00")));
        electronics.addProduct(new Product("Mouse", new BigDecimal("1200.00")));
        categoryRepository.save(electronics);
    }

    @Test
    void shouldFindUsersByRoleWithJPQL() {
        Page<AppUser> admins = userRepository.findUsersByRole("ADMIN", PageRequest.of(0, 10));
        assertThat(admins.getTotalElements()).isEqualTo(1);
        assertThat(admins.getContent().get(0).getEmail()).isEqualTo("admin@test.com");
    }

    @Test
    void shouldFilterProductsByPriceRangeWithJPQL() {
        Page<Product> products = productRepository.findByPriceRange(
                new BigDecimal("1000"),
                new BigDecimal("5000"),
                PageRequest.of(0, 10)
        );
        assertThat(products.getTotalElements()).isEqualTo(1);
        assertThat(products.getContent().get(0).getName()).isEqualTo("Mouse");
    }
}
