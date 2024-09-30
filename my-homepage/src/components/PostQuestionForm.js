// src/components/PostQuestionForm.js
import React, { useState } from 'react';
import { Form, TextArea, Button, Input } from 'semantic-ui-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ImageUpload from './ImageUpload';
import './PostQuestionForm.css';

const PostQuestionForm = () => {
  const [title, setTitle] = useState('');
  const [questionDetails, setQuestionDetails] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');  // Store uploaded image URL

  const handlePostQuestion = async () => {
    try {
      await addDoc(collection(db, 'questions'), {
        title,
        questionDetails,
        tags,
        imageUrl,
        timestamp: new Date()
      });
      alert('Question posted successfully!');
      // Reset form fields
      setTitle('');
      setQuestionDetails('');
      setTags('');
      setImageUrl('');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleImageUploadComplete = (url) => {
    setImageUrl(url);  // Save uploaded image URL
  };

  return (
    <Form className="post-question-form">
      <Form.Field>
        <label>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Start your question with how, what, why, etc." />
      </Form.Field>
      <Form.Field>
        <label>Add an image</label>
        <ImageUpload onUploadComplete={handleImageUploadComplete} />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <TextArea value={questionDetails} onChange={(e) => setQuestionDetails(e.target.value)} placeholder="Describe your problem" />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Please add up to 3 tags to describe what your question is about e.g., Java" />
      </Form.Field>
      <Button type="submit" primary onClick={handlePostQuestion}>Post</Button>
    </Form>
  );
};

export default PostQuestionForm;
