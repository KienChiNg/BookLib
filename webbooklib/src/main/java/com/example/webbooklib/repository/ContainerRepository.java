package com.example.webbooklib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webbooklib.entities.Container;

@Repository
public interface ContainerRepository extends JpaRepository<Container,Integer> {
    
}
