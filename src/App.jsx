import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import LandingPage from './pages/LandingPage';
import SpacePage from './pages/SpacePage';
import PostPage from './pages/PostPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/agora/:spaceName" element={<SpacePage />}></Route>
          <Route path="post/:postTitle" element={<PostPage />} ></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
