package com.example.webbooklib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbooklib.entities.ListBook;
import com.example.webbooklib.repository.ListBookRepository;

@Service
public class ListBookService {
    @Autowired
    private ListBookRepository listBookRepository;
    public List<ListBook> getListBook(){
        return listBookRepository.findAll();
    }
    public ListBook add(ListBook listBook){
        return listBookRepository.save(listBook);
    }
    public ListBook getBook(Integer id){
        return listBookRepository.findById(id).get();
    } 
    public void deleteElementList(Integer id){
        ListBook listBook = getBook(id);
        listBookRepository.delete(listBook);
    }
    public ListBook updateBook(ListBook listBook){
        return listBookRepository.save(listBook);
    }
}
