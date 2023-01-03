package com.example.webbooklib.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="auth")
public class Auth {
    @Id
    @Column(name="id")
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="account")
    private String account;
    @Column(name="passwd")
    private String passwd;
    @Column(name="is_connect")
    private String is_connect;


    public Auth() {
    }


    public Auth(int id, String name, String account, String passwd, String is_connect) {
        this.id = id;
        this.name = name;
        this.account = account;
        this.passwd = passwd;
        this.is_connect = is_connect;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccount() {
        return this.account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPasswd() {
        return this.passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getIs_connect() {
        return this.is_connect;
    }

    public void setIs_connect(String is_connect) {
        this.is_connect = is_connect;
    }
    
}
