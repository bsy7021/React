package com.aloha.todo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.todo.domain.Todos;
import com.aloha.todo.mapper.TodoMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class TodoServiceImpl implements TodoService{

    @Autowired private TodoMapper todoMapper;

    @Override
    public List<Todos> list() throws Exception {
        return todoMapper.list();
    }

    @Override
    public Todos select(Long no) throws Exception {
        return todoMapper.select(no);
    }

    @Override
    public Todos selectById(String id) throws Exception {
        return todoMapper.selectById(id);
    }

    @Override
    public boolean insert(Todos entity) throws Exception {
        entity.setId(UUID.randomUUID().toString());
        return todoMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Todos entity) throws Exception {
        return todoMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Todos entity) throws Exception {
        return todoMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception {
        return todoMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception {
        return todoMapper.deleteById(id) > 0;
    }

    @Override
    public PageInfo<Todos> list(int page, int size) {
        // PageHelper.startPage(현재 페이지, 페이지당 게시글 수)
        PageHelper.startPage(page, size);
        List<Todos> list = todoMapper.list();
        PageInfo<Todos> pageInfo = new PageInfo<>(list);

        // 1️⃣ status 오름차순
        // 2️⃣ seq 오름차순
        pageInfo.getList().sort((t1, t2) -> {
            int statusCompare = t1.getStatus().compareTo(t2.getStatus());
            if( statusCompare != 0 ){
                return statusCompare;
            }
            return t1.getSeq().compareTo(t2.getSeq());
        });

        return pageInfo;
    }

    @Override
    public boolean completeAll() {
        return todoMapper.completeAll() > 0;
    }

    @Override
    public boolean deleteAll() {
        return todoMapper.deleteAll() > 0;
    }

}
