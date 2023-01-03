package com.example.webbooklib.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbooklib.entities.Auth;
import com.example.webbooklib.entities.Comment;
import com.example.webbooklib.entities.Container;
import com.example.webbooklib.entities.ListBook;
import com.example.webbooklib.service.AuthService;
import com.example.webbooklib.service.CommentService;
import com.example.webbooklib.service.ContainerService;
import com.example.webbooklib.service.ListBookService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
// @CrossOrigin(origins = "http://127.0.0.1:8080")
public class Controler {
    @Autowired
    private AuthService authService;
    @Autowired
    private ListBookService listBookService;
    @Autowired
    private ContainerService containerService;
    @Autowired
    private CommentService commentService;
    @GetMapping("/signin")
    public List<Auth> getListAuth(){
        return authService.getListAuth();
    }
    @PostMapping("/register")
    public Auth register(@RequestBody Auth auth){
        return authService.register(auth);
    }
    @PostMapping("/update/account")
    public Auth updateAccount(@RequestBody Auth auth){
        return authService.updateAccount(auth);
    }
    // @PostMapping("/getAcc/{id}")
    // public Auth getAccfindByAccAuth(@PathVariable Integer id){
    //     return authService.getAccfindByAccAuth(id);
    // }
    @PostMapping("/delete/account/{id}")
    public String deleteAccount(@PathVariable Integer id){
        authService.deleteAccount(id);
        return "Xóa thành công tài khoản";
    }
    @GetMapping("/list")
    public List<ListBook> getListBook(){
        return listBookService.getListBook();
    }
    @PostMapping("/addlist")
    public ListBook add(@RequestBody ListBook listBook){
        return listBookService.add(listBook);
    }
    @PostMapping("/delete/elementlist/{id}")
    public String deleteElementList(@PathVariable Integer id){
        listBookService.deleteElementList(id);
        return "Xóa thành công sách";
    }
    @PostMapping("/update/book")
    public ListBook updateBook(@RequestBody ListBook listBook){
        return listBookService.updateBook(listBook);
    }
    @GetMapping("/book/{id}")
    public ListBook getBook(@PathVariable Integer id) {
        return listBookService.getBook(id);
    }
    @GetMapping("/listContainer")
    public List<Container> getContainer(){
        return containerService.getContainer();
    }
    @PostMapping("/updateItemContainer")
    public Container updateContainer(@RequestBody Container container){
        return containerService.updateContainer(container);
    }
    @PostMapping("/delete/itemContainer/{id}")
    public String delItemContainer(@PathVariable Integer id){
        containerService.delItemContainer(id);
        return "Xóa thành công khỏi giỏ hàng";
    }
    @GetMapping("/listComment")
    public List<Comment> getListComment(){
        return commentService.getListComment();
    }
    @PostMapping("/updateItemCmt")
    public Comment update(@RequestBody Comment comment){
        return commentService.update(comment);
    }
    @PostMapping("/delete/itemCmt/{id}")
    public String delCmt(@PathVariable Integer id){
        commentService.delCmt(id);
        return "Xóa thành công bình luận";
    }
    // @PostMapping("/getCommentBook/{id_book}")
    // public Comment getCommentBook(@PathVariable Integer id_book){
    //     return commentService.getCommentBook(id_book);
    // }
}
