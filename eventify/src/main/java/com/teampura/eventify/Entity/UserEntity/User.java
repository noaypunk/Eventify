package com.teampura.eventify.entity.UserEntity;

import jakarta.persistence.*;


@Entity
@Table(name = "users") // ensures table is named 'users'
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    private Long userID;

    @Column(name = "is_Staff", nullable = false)
    private Boolean isStaff = false;

    @Column(name = "fname", nullable = false, length = 50)
    private String fname;

    @Column(name = "lname", nullable = false, length = 50)
    private String lname;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "mobileNum")
    private Long mobileNum;

    @Column(name = "password", nullable = false)
    private String password;

    public Long getUserID() { return userID; }
    public void setUserID(Long userID) { this.userID = userID; }

    public Boolean getIsStaff() { return isStaff; }
    public void setIsStaff(Boolean isStaff) { this.isStaff = isStaff; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getMobileNum() { return mobileNum; }
    public void setMobileNum(Long mobileNum) { this.mobileNum = mobileNum; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
