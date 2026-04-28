package com.example.exp6.config;

import com.example.exp6.model.AppUser;
import com.example.exp6.model.Category;
import com.example.exp6.model.Product;
import com.example.exp6.model.Role;
import com.example.exp6.repository.CategoryRepository;
import com.example.exp6.repository.RoleRepository;
import com.example.exp6.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(RoleRepository roleRepository,
                      UserRepository userRepository,
                      CategoryRepository categoryRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0 || categoryRepository.count() > 0) {
            return;
        }

        Role adminRole = roleRepository.save(new Role("ADMIN"));
        Role customerRole = roleRepository.save(new Role("CUSTOMER"));

        AppUser amit = new AppUser("Amit Raj", "amit@example.com");
        amit.addRole(adminRole);
        amit.addRole(customerRole);

        AppUser sara = new AppUser("Sara Khan", "sara@example.com");
        sara.addRole(customerRole);

        userRepository.save(amit);
        userRepository.save(sara);

        Category electronics = new Category("Electronics");
        electronics.addProduct(new Product("Mechanical Keyboard", new BigDecimal("2499.00")));
        electronics.addProduct(new Product("Wireless Mouse", new BigDecimal("899.00")));
        electronics.addProduct(new Product("Bluetooth Speaker", new BigDecimal("3499.00")));

        Category books = new Category("Books");
        books.addProduct(new Product("Spring Boot in Action", new BigDecimal("699.00")));
        books.addProduct(new Product("Hibernate Tips", new BigDecimal("549.00")));

        categoryRepository.save(electronics);
        categoryRepository.save(books);
    }
}
