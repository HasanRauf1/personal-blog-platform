import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPostForm = ({ match }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, body };
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
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

      <label>body:</label>
      <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>

      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPostForm;
