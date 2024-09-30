// src/components/MessageInput.js
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import './MessageInput.css';

const MessageInput = ({ roomId, user }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        text: message,
        createdAt: serverTimestamp(),
        user  // Send the user's name along with the message
      });
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={!message}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
