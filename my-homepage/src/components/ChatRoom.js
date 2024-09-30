// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import MessageInput from './MessageInput';
import './ChatRoom.css';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);  // Tracks the message to be deleted

  useEffect(() => {
    const messagesRef = collection(db, `rooms/${roomId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [roomId]);

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    const messageRef = doc(db, `rooms/${roomId}/messages`, messageId);
    await deleteDoc(messageRef);
    setIsDeleting(null);
  };

  const getInitials = (name) => {
    return name.split(' ').map((part) => part[0]).join('');
  };

  return (
    <div className="chat-room">
      {!hasEnteredName ? (
        <div className="name-entry-form">
          <h3>Enter Your Name to Join the Chat</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="name-input"
          />
          <button
            className="start-chat-button"
            onClick={() => setHasEnteredName(true)}
            disabled={!user}
          >
            Start Chat
          </button>
        </div>
      ) : (
        <>
          <div className="messages-list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.user === user ? 'sent' : 'received'}`}
                onClick={() => msg.user === user && setIsDeleting(msg.id)} // Allow deletion for own messages
              >
                <div className="message-info">
                  <span className="message-initials">{getInitials(msg.user)}</span>
                  <p className="message-text">{msg.text}</p>
                </div>
                {msg.user === user && isDeleting === msg.id && (
                  <button className="delete-button" onClick={() => handleDeleteMessage(msg.id)}>
                    Confirm Delete
                  </button>
                )}
              </div>
            ))}
          </div>
          <MessageInput roomId={roomId} user={user} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
