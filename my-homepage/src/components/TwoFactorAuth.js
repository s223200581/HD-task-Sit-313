import React, { useState } from 'react';
import axios from 'axios';
import './TwoFactorAuth.css';

const TwoFactorAuth = () => {
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const [token, setToken] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  // Request to setup 2FA
  const setup2FA = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/2fa/setup', { email: 'user@example.com' });
      setQrCode(response.data.qrCode);
      setSecret(response.data.secret);
    } catch (error) {
      console.error('Error setting up 2FA:', error);
    }
  };

  // Request to verify 2FA code
  const verify2FA = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/2fa/verify', { token, secret });
      setVerificationMessage(response.data.message);
    } catch (error) {
      setVerificationMessage('Verification failed. Please try again.');
    }
  };

  return (
    <div className="two-factor-auth">
      <h2>Enable Two-Factor Authentication</h2>
      {!qrCode ? (
        <button onClick={setup2FA}>Setup 2FA</button>
      ) : (
        <div>
          <p>Scan the QR code below with your Authenticator App:</p>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}

      {secret && (
        <div>
          <input
            type="text"
            placeholder="Enter the token from your app"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={verify2FA}>Verify 2FA</button>
        </div>
      )}

      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};

export default TwoFactorAuth;
