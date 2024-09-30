// src/components/Payment.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';  // Import the updated CheckoutForm

// Load your publishable key from Stripe dashboard
const stripePromise = loadStripe('your-publishable-key');  // Replace with your Stripe publishable key

const Payment = () => {
  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
