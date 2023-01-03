package com.example.webbooklib.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbooklib.entities.Container;
import com.example.webbooklib.repository.ContainerRepository;

@Service
public class ContainerService { 
    @Autowired
    private ContainerRepository containerRepository;
    public List<Container> getContainer(){
        return containerRepository.findAll();
    }
    public Container addForContainer(Container container){
        return containerRepository.save(container);
    }
    public Container getItemContainer(Integer id){
        return containerRepository.findById(id).get();
    }
    public void delItemContainer (Integer id){
        Container container = getItemContainer(id);
        containerRepository.delete(container);
    }
    public Container updateContainer(Container container){
        return containerRepository.save(container);
    }
}
