import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the post details
    fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data));

    // Fetch the comments
    fetch(`/api/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  const date = new Date(post.created_at);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

  const deletePost = () => {
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
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

  const Comment = ({ comment }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* If you have user avatars, you can include them here */}
        </div>
        <div className="ml-4">
          <p className="text-gray-600 text-sm">{comment.content}</p>
          <p className="text-gray-500 text-xs">Comment by: {comment.user?.email}</p>
        </div>
      </div>
    </div>
  );

  const addNewComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
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
          {comments.length != 0 && <h2>Comments</h2>}
          {comments?.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {authState.signedIn &&
            <CommentForm postId={postId} onNewComment={addNewComment} />
          }
        </article>
      </div>
    </main>
  );
};

export default PostDetail;
