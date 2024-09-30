// src/components/ForgotPassword.js

import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Form, Button, Message, Card, Header } from 'semantic-ui-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset email has been sent to your email address.');
    } catch (err) {
      setError('Failed to send password reset email. Please check the email and try again.');
    }
  };

  return (
    <Card centered style={{ padding: '2em', maxWidth: '400px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)', borderRadius: '10px' }}>
      <Card.Content>
        <Header as="h2" textAlign="center" style={{ marginBottom: '1.5em', fontWeight: '500', color: '#333' }}>
          Reset Password
        </Header>

        {message && <Message positive>{message}</Message>}
        {error && <Message negative>{error}</Message>}

        <Form onSubmit={handlePasswordReset}>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1.5em', padding: '15px' }}
            required
          />
          <Button color="blue" fluid size="large" style={{ padding: '15px', fontWeight: 'bold', backgroundColor: '#0056b3' }}>
            Send Reset Email
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default ForgotPassword;
