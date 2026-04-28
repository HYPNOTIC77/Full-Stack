package com.example.exp8.service;

import com.example.exp8.dto.ProductRequest;
import com.example.exp8.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {
    private final List<Product> products = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(3);

    public ProductService() {
        products.add(new Product(1L, "Laptop", "Electronics", 69999.0));
        products.add(new Product(2L, "Chair", "Furniture", 3499.0));
        products.add(new Product(3L, "Notebook", "Stationery", 99.0));
    }

    public synchronized List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public synchronized Product addProduct(ProductRequest request) {
        Product product = new Product(
                idGenerator.incrementAndGet(),
                request.getName(),
                request.getCategory(),
                request.getPrice()
        );
        products.add(product);
        return product;
    }
}
