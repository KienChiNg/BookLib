package com.example.webbooklib.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="comment")
public class Comment {
    @Id
    @Column(name="id")
    private int id;
    @Column(name="id_customer")
    private int id_customer;
    @Column(name="id_book")
    private int id_book;
    @Column(name="cmt")
    private String cmt;
    @Column(name="star")
    private int star;


    public Comment() {
    }

    public Comment(int id, int id_customer, int id_book, String cmt, int star) {
        this.id = id;
        this.id_customer = id_customer;
        this.id_book = id_book;
        this.cmt = cmt;
        this.star = star;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_customer() {
        return this.id_customer;
    }

    public void setId_customer(int id_customer) {
        this.id_customer = id_customer;
    }

    public int getId_book() {
        return this.id_book;
    }

    public void setId_book(int id_book) {
        this.id_book = id_book;
    }

    public String getCmt() {
        return this.cmt;
    }

    public void setCmt(String cmt) {
        this.cmt = cmt;
    }

    public int getStar() {
        return this.star;
    }

    public void setStar(int star) {
        this.star = star;
    }

}
