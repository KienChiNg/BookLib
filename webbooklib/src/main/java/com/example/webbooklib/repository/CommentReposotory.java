package com.example.webbooklib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.webbooklib.entities.Comment;

@Repository
public interface CommentReposotory extends JpaRepository<Comment,Integer> {
    @Query("SELECT p from Comment p where p.id_book = id_book")
    Comment findByCommentBook(@Param("id_book")Integer id_book);
}
