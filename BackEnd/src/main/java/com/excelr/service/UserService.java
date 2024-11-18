package com.excelr.service;
import com.excelr.model.User;
import com.excelr.wrapper.Login;

import java.util.List;

public interface UserService {
  public  User createUser(User user);
   public User getUserByEmailAndPassword(Login login);
    public User updateUser(Long id, User user);

   public  List<User> getAllUsers();
}