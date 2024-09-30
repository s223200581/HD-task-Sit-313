// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Message, Form } from 'semantic-ui-react';
import './CheckoutForm.css';  // Import custom CSS for checkout form

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Capture additional user details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
        email: email,
        address: {
          line1: address,
          country: country,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
      setSuccess(true);
      // Proceed with server-side payment processing using paymentMethod.id
      console.log(paymentMethod);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Form.Input
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Form.Input
        label="Home Address"
        placeholder="Home Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Form.Input
        label="Email Address"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Form.Input
        label="Country"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />

      {/* Card details field */}
      <CardElement />
      
      {error && <Message negative>{error}</Message>}
      {success && <Message positive>Payment successful!</Message>}

      <Button type="submit" color="blue" fluid disabled={!stripe}>
        Pay Now
      </Button>
    </Form>
  );
};

export default CheckoutForm;
