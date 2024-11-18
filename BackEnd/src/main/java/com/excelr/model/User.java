package com.excelr.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;

    @Column(unique = true)
    private String email;

    private String mobileNumber;
    private String password;
    private boolean isAdmin ;
    private Long emp_id;

    public User() {
        this.isAdmin = false;
    }

    public User(long id, String userName, String email, String mobileNumber, String password, boolean isAdmin, Long emp_id) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.isAdmin = isAdmin;
        this.emp_id=emp_id;
        
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", email=" + email + ", mobileNumber=" + mobileNumber
				+ ", password=" + password + ", isAdmin=" + isAdmin + "]";
	}
	
	
}

