package com.excelr.service;
import com.excelr.model.User;
import com.excelr.repo.UserRepo;
import com.excelr.wrapper.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmailAndPassword(Login user) {
        String email = user.getEmail();
        String password = user.getPassword();
        return userRepository.findByEmailAndPassword(email,password);
    }


    @Override
    public User updateUser(Long id, User user) {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
