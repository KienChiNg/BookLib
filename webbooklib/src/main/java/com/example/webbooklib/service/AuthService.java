package com.example.webbooklib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbooklib.entities.Auth;
import com.example.webbooklib.repository.AuthRepository;

@Service
public class AuthService {
    @Autowired
    private AuthRepository authRepository;
    public List<Auth> getListAuth(){
        return authRepository.findAll();
    }
    public Auth register(Auth auth){
        return authRepository.save(auth);
    }
    public Auth getAuth(Integer id){
        return authRepository.findById(id).get();
    }
    public void deleteAccount(Integer id){
        Auth auth = getAuth(id);
        authRepository.delete(auth);
    }
    public Auth updateAccount(Auth auth){
        return authRepository.save(auth);
    }
    // public Auth getAccfindByAccAuth(Integer id){
    //     Auth auth = null;
    //     auth = authRepository.findByAccAuth(id);
    //     return auth;
    // }
}
