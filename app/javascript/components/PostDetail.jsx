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

  const Comment = ({ comment }) => {
    // Extract the first character and capitalize it
    const initial = comment.user?.email ? comment.user.email.charAt(0).toUpperCase() : 'U';
  
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* User avatar with initial */}
            <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-gray-800 font-semibold">
              {initial}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 text-sm font-medium">{comment.content}</p>
            <p className="text-gray-500 text-xs mt-1">Comment by: {comment.user?.email}</p>
          </div>
        </div>
      </div>
    );
  };
  

  const addNewComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <main className="bg-white dark:bg-gray-900 antialiased">
      <div className="container mx-auto px-4 py-8">
        <article>
          <header className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600">Published {formattedDate}</p>
          </header>
          <div className="mb-6 prose prose-lg max-w-none text-gray-800">{post.body}</div>
          {authState.user?.id === post?.user_id &&
            <div className="flex gap-4 mb-6">
              <Link to={`/post/${post.id}/edit`}>
                <button className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
                  Edit
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
              >
                Delete Post
              </button>
            </div>
          }
          <section>
            {comments.length !== 0 && <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>}
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
            {authState.signedIn &&
              <div className="mt-6">
                <CommentForm postId={postId} onNewComment={addNewComment} />
              </div>
            }
          </section>
        </article>
      </div>
    </main>
  );
};

export default PostDetail;
