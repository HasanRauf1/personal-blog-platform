import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="group block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Link to={`/post/${post.id}`}>
              <h3 className="text-lg font-semibold text-indigo-800 group-hover:text-indigo-600">{post.title}</h3>
            </Link>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
