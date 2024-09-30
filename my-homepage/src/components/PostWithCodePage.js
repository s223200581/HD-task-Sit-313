// src/components/PostWithCodePage.js

import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/mode/javascript/javascript'; // Add your desired language modes
import 'codemirror/lib/codemirror.css';
import './PostWithCodePage.css';  // Create a separate CSS file for styling

const PostWithCodePage = () => {
  const [markdown, setMarkdown] = useState('');
  const [code, setCode] = useState('');

  // Handle the submission of the post
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit post logic goes here (e.g., store in database)
    console.log('Markdown:', markdown);
    console.log('Code:', code);
  };

  return (
    <div className="post-with-code-container">
      <h2>Create a Post with Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="markdown">Post Content (Markdown Supported)</label>
          <textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows="8"
            placeholder="Write your post here..."
            required
          ></textarea>
        </div>

        <div className="form-section">
          <label htmlFor="code">Code Snippet</label>
          <CodeMirror
            value={code}
            options={{
              mode: 'javascript',  // Change mode based on the language you're allowing
              theme: 'default',
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
          />
        </div>

        <button type="submit" className="submit-button">Submit Post</button>
      </form>

      <div className="preview-section">
        <h3>Preview:</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

export default PostWithCodePage;
