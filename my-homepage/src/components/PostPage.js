// PostPage.js

import React, { useState } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import PostTypeSelection from './PostTypeSelection';
import PostArticleForm from './PostArticleForm';
import PostQuestionForm from './PostQuestionForm';

const PostPage = () => {
  const [postType, setPostType] = useState(''); // Initialize with an empty string

  const handlePostTypeChange = (e, { value }) => {
    setPostType(value); // Update the state with the value from the radio button
  };

  return (
    <Container style={{ paddingTop: '7em' }}>
      <Header as="h2">New Post</Header>
      <Segment raised>
        <PostTypeSelection postType={postType} onSelectPostType={handlePostTypeChange} />
        {/* Conditional rendering for the forms */}
        {postType === 'article' && <PostArticleForm />}
        {postType === 'question' && <PostQuestionForm />}
      </Segment>
    </Container>
  );
};

export default PostPage;
