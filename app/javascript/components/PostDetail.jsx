import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const date = new Date(post.created_at);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

  const deletePost = () => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          navigate('/');
        } else {
          console.error('Delete failed');
        }
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };

  return (
    <main className="bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="prose lg:prose-xl mx-auto">
          <header>
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <p className="text-sm md:text-base font-normal text-gray-600">
              Published {formattedDate}
            </p>
          </header>
          <p>{post.body}</p>
          {authState.user?.id == post?.user_id &&
            <div className="flex gap-4">
              <Link to={`/post/${post.id}/edit`}>
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                  Edit
                </button>
              </Link>
              <button
                type="button"
                onClick={deletePost}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                Delete Post
              </button>
            </div>
          }

        </article>
      </div>
    </main>
  );
};

export default PostDetail;
