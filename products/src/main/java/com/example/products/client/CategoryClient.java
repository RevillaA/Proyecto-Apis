package com.example.products.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "categories-api", url = "http://categories-api:8001")
public interface CategoryClient {
    @GetMapping("/api/categories/{id}")
    CategoryDTO getCategoryById(@PathVariable("id") Long id);
}
