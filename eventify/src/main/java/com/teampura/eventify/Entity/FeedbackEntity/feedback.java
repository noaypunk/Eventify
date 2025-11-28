package com.teampura.eventify.entity.FeedbackEntity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.teampura.eventify.entity.UserEntity.User;

@Entity
public class feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long feedbackID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    private int rating;
    private String comments;
    private LocalDateTime dateSubmitted;

    public long getFeedbackID() {
        return feedbackID;
    }
    public void setFeedbackID(long feedbackID) {
        this.feedbackID = feedbackID;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    public LocalDateTime getDateSubmitted() {
        return dateSubmitted;
    }
    public void setDateSubmitted(LocalDateTime dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

}
