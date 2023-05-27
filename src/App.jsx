import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import LandingPage from './pages/LandingPage';
import SpacePage from './pages/SpacePage';
import PostPage from './pages/PostPage';
import SettingsPage from './pages/SettingsPage';
import { isAuthenticatedAtom } from './recoil/atoms/authAtom';
import NotificationPage from './pages/NotificationPage';
import Error404 from './pages/Error404';

// Higher-order component (HOC) for protecting routes
const ProtectedRoute = ({ path, element: Component }) => {
  // Add your authentication logic here
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom) // Replace with your actual authentication check

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agora/:spaceName" element={<SpacePage />} />
          <Route path="post/:postTitle" element={<PostPage />} />
          <Route
            path="/settings/*"
            element={<ProtectedRoute element={SettingsPage} />}
          />
          <Route path="notifications" element={<NotificationPage />}></Route>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
