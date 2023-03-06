import React, { useState } from 'react';
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from './pages/PostDetail';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/space/:id" element={<PostDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
