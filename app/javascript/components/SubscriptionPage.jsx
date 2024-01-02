import React, { useState, useEffect } from 'react';

const SubscriptionPage = () => {
  const [specificSubscriptions, setSpecificSubscriptions] = useState([]);
  const [generalSubscription, setGeneralSubscription] = useState({
    subscribe_to_new_posts: false,
    subscribe_to_all_comments: false,
    subscribe_to_own_post_comments: false
  });
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specific subscriptions
    fetch('/api/specific_subscriptions')
      .then(response => response.json())
      .then(data => setSpecificSubscriptions(data));

    // Fetch general subscription settings
    fetch('/api/general_subscription')
      .then(response => response.json())
      .then(data => {
        setGeneralSubscription({
          subscribe_to_new_posts: data.subscribe_to_new_posts || false,
          subscribe_to_all_comments: data.subscribe_to_all_comments || false,
          subscribe_to_own_post_comments: data.subscribe_to_own_post_comments || false
        });
      });

    // Fetch posts and authors
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data));

    fetch('/api/users')
      .then(response => response.json())
      .then(data => setAuthors(data));

    setLoading(false);
  }, []);

  const handleGeneralSubscriptionChange = (e) => {
    const { name, checked } = e.target;
    const updatedSettings = {
      ...generalSubscription,
      [name]: checked
    };
    setGeneralSubscription(updatedSettings);
    saveGeneralSubscription(updatedSettings);
  };

  const saveGeneralSubscription = (updatedSettings) => {
    const subscriptionData = {
      subscribe_to_new_posts: updatedSettings.subscribe_to_new_posts,
      subscribe_to_all_comments: updatedSettings.subscribe_to_all_comments,
      subscribe_to_own_post_comments: updatedSettings.subscribe_to_own_post_comments
    };

    fetch('/api/general_subscription', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      },
      body: JSON.stringify({ general_subscription: subscriptionData })
    })
      .then(response => response.json())
      .then(updatedSubscription => setGeneralSubscription(updatedSubscription));
  };

  const handleNewSpecificSubscription = (subscribableType, subscribableId) => {
    fetch('/api/specific_subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      },
      body: JSON.stringify({
        specific_subscription: {
          subscribable_type: subscribableType,
          subscribable_id: subscribableId
        }
      })
    })
      .then(response => response.json())
      .then(newSubscription => setSpecificSubscriptions(prev => [...prev, newSubscription]));
  };

  const handleUnsubscribe = (subscriptionId) => {
    fetch(`/api/specific_subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      }
    })
      .then(() => setSpecificSubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId)));
  };

  const renderPostsDropdown = () => {
    const subscribedPostIds = specificSubscriptions
      .filter(subscription => subscription.subscribable_type === 'Post')
      .map(subscription => subscription.subscribable_id);

    const unsubscribedPosts = posts.filter(post => !subscribedPostIds.includes(post.id));

    return (
      <select
        value={selectedPostId}
        onChange={(e) => setSelectedPostId(e.target.value)}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Select a Post</option>
        {unsubscribedPosts.map(post => (
          <option key={post.id} value={post.id}>{post.title}</option>
        ))}
      </select>
    );
  };

  const renderAuthorsDropdown = () => {
    const subscribedAuthorIds = specificSubscriptions
      .filter(subscription => subscription.subscribable_type === 'User')
      .map(subscription => subscription.subscribable_id);

    const unsubscribedAuthors = authors.filter(author => !subscribedAuthorIds.includes(author.id));

    return (
      <select
        value={selectedAuthorId}
        onChange={(e) => setSelectedAuthorId(e.target.value)}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Select an Author</option>
        {unsubscribedAuthors.map(author => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
    );
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Subscriptions</h1>

      {/* General Subscriptions */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="subscribe_to_new_posts"
            checked={generalSubscription.subscribe_to_new_posts}
            onChange={handleGeneralSubscriptionChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Subscribe to All New Posts
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="subscribe_to_all_comments"
            checked={generalSubscription.subscribe_to_all_comments}
            onChange={handleGeneralSubscriptionChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Subscribe to All New Comments
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="subscribe_to_own_post_comments"
            checked={generalSubscription.subscribe_to_own_post_comments}
            onChange={handleGeneralSubscriptionChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Subscribe to Comments on My Posts
          </label>
        </div>
      </div>

      {/* Subscription to specific posts */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subscribe to Comments on Specific Post:</label>
        {renderPostsDropdown()}
        <button
          onClick={() => handleNewSpecificSubscription('Post', selectedPostId)}
          className="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </div>

      {/* Subscription to specific authors */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subscribe to New Posts by Author:</label>
        {renderAuthorsDropdown()}
        <button
          onClick={() => handleNewSpecificSubscription('User', selectedAuthorId)}
          className="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </div>

      {/* Display Current Specific Subscriptions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Specific Subscriptions</h2>
        {specificSubscriptions.map(specificSubscription => (
          <div key={specificSubscription.id} className="bg-gray-100 p-4 rounded-md mb-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 flex-grow">{`Subscribed to ${specificSubscription.subscribable_type} ${specificSubscription.subscribable_name}`}</p>
              <button
                onClick={() => handleUnsubscribe(specificSubscription.id)}
                className="px-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                X
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SubscriptionPage;
