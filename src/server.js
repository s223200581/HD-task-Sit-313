const express = require('express');
const cors = require('cors');
const axios = require('axios');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;
const CHATGPT_API_KEY = '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'; // replace with your key

// ChatGPT API Route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const assistantMessage = response.data.choices[0].message.content;
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    res.status(500).json({ message: 'Failed to communicate with ChatGPT' });
  }
});

// 2FA Route - Generate QR Code for TOTP
app.post('/api/2fa/setup', (req, res) => {
  const { email } = req.body;

  const secret = speakeasy.generateSecret({ length: 20, name: `MyApp (${email})` });
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating QR code' });
    }
    // Send the QR code and the secret to the frontend
    res.json({ secret: secret.base32, qrCode: data });
  });
});

// 2FA Route - Verify TOTP Code
app.post('/api/2fa/verify', (req, res) => {
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    res.json({ message: '2FA verification successful' });
  } else {
    res.status(400).json({ message: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
