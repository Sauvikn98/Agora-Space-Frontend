import React, { useState } from 'react';
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/post/:id" element={<PostDetail />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
