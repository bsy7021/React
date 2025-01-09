package com.aloha.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.product.domain.Product;
import com.aloha.product.mapper.ProductMapper;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired private ProductMapper productMapper;

    @Override
    public List<Product> list() throws Exception {
        return productMapper.list();
    }

    @Override
    public Product select(Long no) throws Exception {
        return productMapper.select(no);
    }

    @Override
    public Product selectById(String id) throws Exception {
        return productMapper.selectById(id);
    }

    @Override
    public boolean insert(Product entity) throws Exception {
        return productMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Product entity) throws Exception {
        return productMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Product entity) throws Exception {
        return productMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception {
        return productMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception {
        return productMapper.deleteById(id) > 0;
    }

}
