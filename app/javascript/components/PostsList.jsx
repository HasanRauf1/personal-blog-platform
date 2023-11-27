// PostsList.jsx

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
            <div className="min-w-0 flex-auto">
              <Link to={`/post/${post.id}`}>
                <p className="text-sm font-semibold leading-6 text-gray-900">{post.title}</p>
              </Link>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{post.body}</p>
              <Link to={`/post/${post.id}/edit`}>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                >
                  {/* <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                  Edit
                </button>
              </Link>
            </div>
          </div>

        </li>
      ))}
    </ul>
  )

  // return (
  //   <div>
  //     {posts.map(post => (
  //       <div key={post.id}>
  //         <h3><Link to={`/post/${post.id}`}>
  //           {post.title}
  //           <Link to={`/post/${post.id}/edit`}>
  //             <button>Edit</button>
  //           </Link>
  //         </Link></h3>
  //         {/* Add more post details if necessary */}
  //       </div>
  //     ))}
  //     <Link to="/post/new">
  //       <button>New Post</button> {/* New Post button */}
  //     </Link>
  //   </div>
  // );
};

export default PostsList;
