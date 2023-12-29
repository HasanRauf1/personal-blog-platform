import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';
import Navbar from './components/Navbar';
import ContentContainer from './components/ContentContainer';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <ContentContainer>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/new" element={<NewPostForm />} />
          <Route path="/post/:id/edit" element={<EditPostForm />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ContentContainer>
      </AuthProvider>
    </Router>
  );
};

export default App;
