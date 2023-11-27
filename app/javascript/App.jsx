import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';
import Navbar from './components/Navbar';
import ContentContainer from './components/ContentContainer';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <ContentContainer>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/new" element={<NewPostForm />} />
          <Route path="/post/:id/edit" element={<EditPostForm />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </ContentContainer>
    </Router>
  );
};

export default App;
