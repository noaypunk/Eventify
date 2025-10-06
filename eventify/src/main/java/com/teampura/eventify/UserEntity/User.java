package com.teampura.eventify.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long userID;
    private String fname;
    private String lname;
    private String email;
    private long mobileNum;
    private String password;
    
    public Long getId() { return userID; }
    public void setId(Long id, long userID) { this.userID = userID; }

    public String getFname() { return fname; }
    public void setfname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public long getMobileNum() { return mobileNum; }
    public void setMobileNum(long mobileNum) { this.mobileNum = mobileNum; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

}
