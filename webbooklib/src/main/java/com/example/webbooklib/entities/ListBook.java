package com.example.webbooklib.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="book")
public class ListBook {
    @Id
    @Column(name="id")
    private int id;
    @Column(name="title")
    private String title;
    @Column(name="auth")
    private String auth;
    @Column(name="description")
    private String description;
    @Column(name="update_day")
    private String update_day;
    @Column(name="num_of_pages")
    private int num_of_pages;
    @Column(name="category")
    private String category;
    @Column(name="img")
    private String img;

    public ListBook() {
    }

    public ListBook(int id, String title, String auth, String description, String update_day, int num_of_pages, String category, String img) {
        this.id = id;
        this.title = title;
        this.auth = auth;
        this.description = description;
        this.update_day = update_day;
        this.num_of_pages = num_of_pages;
        this.category = category;
        this.img = img;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuth() {
        return this.auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUpdate_day() {
        return this.update_day;
    }

    public void setUpdate_day(String update_day) {
        this.update_day = update_day;
    }

    public int getNum_of_pages() {
        return this.num_of_pages;
    }

    public void setNum_of_pages(int num_of_pages) {
        this.num_of_pages = num_of_pages;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImg() {
        return this.img;
    }

    public void setImg(String img) {
        this.img = img;
    }

}
