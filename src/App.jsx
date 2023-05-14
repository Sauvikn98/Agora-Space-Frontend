import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import LandingPage from './pages/LandingPage';
import SpacePage from './pages/SpacePage';
import PostPage from './pages/PostPage';
import SettingsPage from './pages/SettingsPage';
import NotificationPage from './pages/NotificationPage';
import AccountSettings from './components/Settings/UserSettings/AccountSettings';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='380227371484-768gntmvb04t2b1t9tl6q5cjrub5tro9.apps.googleusercontent.com'>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="agora/:spaceName" element={<SpacePage />}></Route>
            <Route path="post/:postTitle" element={<PostPage />} ></Route>
            <Route path="settings" element={<SettingsPage />}>
              <Route path="account" />
              <Route path="profile" />
              <Route path="privacy" />
              <Route path="feed" />
              <Route path="messaging" />
            </Route>
            <Route path="notifications" element={<NotificationPage />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </GoogleOAuthProvider>
  )
}

export default App
