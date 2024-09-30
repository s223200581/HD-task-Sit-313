// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Added Link for Forgot Password
import { Form, Button, Card, Header, Message } from 'semantic-ui-react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';  // Import Google auth provider and Firebase auth
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Email and password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      navigate('/');  // Redirect to home after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);  // Google login
      alert('Login with Google successful');
      navigate('/');  // Redirect to home after Google login
    } catch (err) {
      setError('Error signing in with Google');
    }
  };

  return (
    <Card centered style={{ padding: '2em', maxWidth: '400px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)', borderRadius: '10px' }}>
      <Card.Content>
        <Header as="h2" textAlign="center" style={{ marginBottom: '1.5em', fontWeight: '500', color: '#333' }}>
          Login to DEV@Deakin
        </Header>

        {/* Error message */}
        {error && <Message negative>{error}</Message>}

        {/* Email and password login form */}
        <Form onSubmit={handleLogin}>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1em', padding: '15px' }}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1.5em', padding: '15px' }}
          />
          <Button color="blue" fluid size="large" style={{ padding: '15px', fontWeight: 'bold', backgroundColor: '#0056b3' }}>
            Login
          </Button>
        </Form>

        {/* Google login button */}
        <Button color="google plus" fluid size="large" style={{ marginTop: '10px' }} onClick={handleGoogleLogin}>
          Login with Google
        </Button>
      </Card.Content>

      {/* Sign up and Forgot Password links */}
      <Card.Content extra textAlign="center">
        <Message>
          <Link to="/forgot-password">Forgot password?</Link> <br/>
          New here? <Link to="/signup">Sign up</Link>
        </Message>
      </Card.Content>
    </Card>
  );
};

export default Login;
