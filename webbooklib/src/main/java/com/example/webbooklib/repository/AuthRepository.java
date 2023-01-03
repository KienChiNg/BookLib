package com.example.webbooklib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.webbooklib.entities.Auth;

@Repository
public interface AuthRepository extends JpaRepository<Auth,Integer> {
    @Query("SELECT p from Auth p where p.account = :account")
    Auth findByAccAuth(@Param("account")String account);
}
