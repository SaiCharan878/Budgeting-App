package com.banking.services;

import com.banking.models.Subscription;
import com.banking.repositories.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public List<Subscription> getSubscriptionsByUserId(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

	public void markAsPaid(Long userId, Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        if (!subscription.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        subscription.setStatus("Paid");
        subscriptionRepository.save(subscription);
    }

    public Subscription createSubscription(Subscription subscription) {
        subscription.setStatus("Pending"); // default
        return subscriptionRepository.save(subscription);
    }
}
