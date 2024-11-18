package com.excelr.controller;
import com.excelr.model.User;
import com.excelr.service.UserService;
import com.excelr.wrapper.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user/")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User createUser(@RequestBody User user)
    {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public User findUserByPassword(@RequestBody Login userLogin)
    {
        System.out.println(userLogin);
        return userService.getUserByEmailAndPassword(userLogin);
    }

    @GetMapping("/")
    public List<User> getAllUser()
    {
        return userService.getAllUsers();
    }
    
}
