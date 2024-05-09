import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './/pages/Home.tsx';
import PostPage from './/pages/Post.tsx';

import { createContext } from 'react';

import './App.css';

/*
 Router : BrowserRouter, 라우팅이 작동하는 환경
 Routes : 다양한 라우트를 담는 것
 Route : 어떤 경로의 URL 에서는 어떤 컴포넌트로 연결해준다. 하는 것
*/
const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
