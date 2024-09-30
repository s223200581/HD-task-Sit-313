// src/components/ChatGPTAssistant.js
import React, { useState } from 'react';
import axios from 'axios';
import './ChatGPTAssistant.css';

const ChatGPTAssistant = () => {
  const [messages, setMessages] = useState([]); // Store chat history
  const [userInput, setUserInput] = useState(''); // User input state
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Append user message to chat history
    const newMessage = { role: 'user', content: userInput };
    setMessages([...messages, newMessage]);
    setUserInput('');
    setLoading(true);

    try {
      // Send message to ChatGPT API
      const response = await axios.post('http://localhost:5000/api/chat', { message: userInput });
      
      // Append assistant response to chat history
      const assistantMessage = { role: 'assistant', content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
      const errorMessage = { role: 'assistant', content: 'Error: Could not communicate with ChatGPT.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatgpt-assistant-container">
      <div className="chat-box">
        <h3>Chat with GPT Assistant</h3>
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? 'user-message' : 'assistant-message'}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            rows="2"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !userInput}>
            {loading ? 'Loading...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatGPTAssistant;
