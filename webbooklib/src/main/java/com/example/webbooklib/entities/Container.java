package com.example.webbooklib.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="container")
public class Container {
    @Id
    @Column(name="id")
    private int id;
    @Column(name="idd_customer")
    private int idd_customer;
    @Column(name="idd_book")
    private int idd_book;
    @Column(name="amount")
    private int amount;


    public Container() {
    }


    public Container(int id, int idd_customer, int idd_book, int amount) {
        this.id = id;
        this.idd_customer = idd_customer;
        this.idd_book = idd_book;
        this.amount = amount;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdd_customer() {
        return this.idd_customer;
    }

    public void setIdd_customer(int idd_customer) {
        this.idd_customer = idd_customer;
    }

    public int getIdd_book() {
        return this.idd_book;
    }

    public void setIdd_book(int idd_book) {
        this.idd_book = idd_book;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


    

}
