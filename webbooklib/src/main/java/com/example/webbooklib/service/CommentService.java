package com.example.webbooklib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbooklib.entities.Comment;
import com.example.webbooklib.repository.CommentReposotory;

@Service
public class CommentService {
    @Autowired
    private CommentReposotory commentReposotory;
    public List<Comment> getListComment(){
        return commentReposotory.findAll();
    }
    public Comment add(Comment comment){
        return commentReposotory.save(comment);
    }
    public Comment getComment(Integer id){
        return commentReposotory.findById(id).get();
    }
    public void delCmt(Integer id){
        Comment comment = getComment(id);
        commentReposotory.delete(comment);
    } 
    public Comment update(Comment comment){
        return commentReposotory.save(comment);
    }
    public Comment getCommentBook(Integer id_book){
        Comment comment= null;
        comment = commentReposotory.findByCommentBook(id_book);
        return comment;
    }
}
