package com.example.webbooklib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webbooklib.entities.ListBook;

@Repository
public interface ListBookRepository extends JpaRepository<ListBook,Integer> {
    
}
