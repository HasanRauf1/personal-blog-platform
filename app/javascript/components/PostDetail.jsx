// PostDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/posts/${id}`)
    .then(response => response.json())
    .then(data => setPost(data));
  }, [id]);
  
  if (!post) return <div>Loading...</div>;
  
  const date = new Date(post.created_at);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  
  return (
    <main className="bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="prose lg:prose-xl mx-auto">
          <header>
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <p class="text-sm md:text-base font-normal text-gray-600">
              Published {formattedDate}
            </p>
          </header>
          <p>{post.body}</p>
          <Link to="/">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Home
            </button>
          </Link>
        </article>
      </div>
    </main>
  );
};

export default PostDetail;
