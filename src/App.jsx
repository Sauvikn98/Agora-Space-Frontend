import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route exact path="/create-profile" element={<SignIn/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
