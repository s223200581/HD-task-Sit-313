// src/components/PostArticleForm.js
import React, { useState } from 'react';
import { Form, TextArea, Button, Input } from 'semantic-ui-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ImageUpload from './ImageUpload';
import './PostArticleForm.css';

const PostArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePostArticle = async () => {
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        articleText,
        tags,
        imageUrl,
        timestamp: new Date()
      });
      alert('Article posted successfully!');
      // Reset form fields
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImageUrl('');
    } catch (error) {
      console.error('Error posting article:', error);
    }
  };

  const handleImageUploadComplete = (url) => {
    setImageUrl(url);  // Save uploaded image URL
  };

  return (
    <Form className="post-article-form">
      <Form.Field>
        <label>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a descriptive title" />
      </Form.Field>
      <Form.Field>
        <label>Add an image</label>
        <ImageUpload onUploadComplete={handleImageUploadComplete} />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="Enter a 1-paragraph abstract" />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea value={articleText} onChange={(e) => setArticleText(e.target.value)} placeholder="Enter the full article text" />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Please add up to 3 tags to describe what your article is about e.g., Java" />
      </Form.Field>
      <Button type="submit" primary onClick={handlePostArticle}>Post</Button>
    </Form>
  );
};

export default PostArticleForm;
