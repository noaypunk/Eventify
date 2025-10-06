package com.teampura.eventify.FeedbackEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long feedbackID;
}
