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
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li key={post.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto ">
              <Link to={`/post/${post.id}`}>
                <p className="text-md font-semibold leading-6 text-gray-900">{post.title}</p>
              </Link>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{post.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
};

export default PostsList;
