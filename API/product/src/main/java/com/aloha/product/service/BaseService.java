package com.aloha.product.service;

import java.util.List;

public interface BaseService<E> {
    List<E> list() throws Exception;

    E select(Long no) throws Exception;
    E selectById(String id) throws Exception;

    boolean insert(E entity) throws Exception;

    boolean update(E entity) throws Exception;
    boolean updateById(E entity) throws Exception;

    boolean delete(Long no) throws Exception;
    boolean deleteById(String id) throws Exception;
}
