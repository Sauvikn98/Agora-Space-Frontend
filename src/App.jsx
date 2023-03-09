import React, { useState } from 'react';
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Space from './pages/Space';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/space/:id" element={<Space/>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
