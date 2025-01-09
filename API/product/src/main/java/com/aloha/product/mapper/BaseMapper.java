package com.aloha.product.mapper;

import java.util.List;

import com.aloha.product.domain.Product;

public interface BaseMapper<E> {
    public List<E> list() throws Exception;

    public Product select(Long no) throws Exception;
    public Product selectById(String id) throws Exception;

    public int insert(E entity) throws Exception;

    public int update(E entity) throws Exception;
    public int updateById(E entity) throws Exception;

    public int delete(Long no) throws Exception;
    public int deleteById(String id) throws Exception;
}
