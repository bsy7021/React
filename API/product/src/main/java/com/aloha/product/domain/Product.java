package com.aloha.product.domain;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Product {
    private Long no;
    private String id;
    private String title;
    private String content;
    private String img;
    private Long likes;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Product(){
        this.id = UUID.randomUUID().toString();
    }
}
