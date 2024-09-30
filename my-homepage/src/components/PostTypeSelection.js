// PostTypeSelection.js

import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import './PostTypeSelection.css'; // Import CSS

const PostTypeSelection = ({ postType, onSelectPostType }) => {
  return (
    <Form className="post-type-selection">
      <Form.Field>
        <label>Select Post Type:</label>
        <Radio
          label="Question"
          name="postType"
          value="question"
          checked={postType === 'question'}
          onChange={onSelectPostType} // Calls the handler passed from PostPage
        />
        <Radio
          label="Article"
          name="postType"
          value="article"
          style={{ marginLeft: '15px' }}
          checked={postType === 'article'}
          onChange={onSelectPostType} // Calls the handler passed from PostPage
        />
      </Form.Field>
    </Form>
  );
};

export default PostTypeSelection;
