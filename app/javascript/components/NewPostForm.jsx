// NewPostForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const postData = { title, body };

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (response.ok) {
        // Redirect to the home page after successful update
        navigate('/');
      } else {
        // Handle errors, e.g., display an error message
        console.error('Update failed');
      }
    })
    .catch(error => {
      // Handle network errors
      console.error('Network error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

      <label>Body:</label>
      <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>

      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPostForm;
