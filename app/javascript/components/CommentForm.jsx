import React, { useState } from 'react';

const CommentForm = ({ postId, onNewComment }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },
        body: JSON.stringify({ comment: { content } })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newComment = await response.json();
      console.log(newComment);
      onNewComment(newComment);
      setContent('');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full" />
      <button type="submit" className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Post Comment</button>
    </form>
  );
};

export default CommentForm;
