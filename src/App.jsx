import React from 'react';
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Space from './pages/Space';
import Post from './pages/Post';
import Settings from './pages/Settings';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/agora/:spaceName" element={<Space />}></Route>
          <Route path="comments/:postTitle" element={<Post/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
