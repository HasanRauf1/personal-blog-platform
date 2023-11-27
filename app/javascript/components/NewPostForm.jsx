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
        navigate('/');
      } else {
        console.error('Update failed');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
