package com.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.banking.models.Subscription;
import com.banking.services.SubscriptionService;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    // Get all subscriptions for a user
    @GetMapping("/{userId}")
    public List<Subscription> getSubscriptions(@PathVariable Long userId) {
        return subscriptionService.getSubscriptionsByUserId(userId);
    }

    // Add a new subscription
    @PostMapping("/{userId}/add")
    public Subscription addSubscription(@RequestBody Subscription subscription) {
        return subscriptionService.createSubscription(subscription);
    }

    // Mark a subscription as paid
    @PutMapping("/{userId}/{subscriptionId}/pay")
    public void markSubscriptionAsPaid(@PathVariable Long userId, @PathVariable Long subscriptionId) {
        subscriptionService.markAsPaid(userId, subscriptionId);
    }
}
