import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Result from './pages/Result';
import SignUp from './pages/signup/';
import SignUpTwo from './pages/SignUpTwo';
import Login from './pages/Login';
import Start from './pages/Start';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/result" element={<Result />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signuptwo" element={<SignUpTwo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </Router>
  );
}

export default App;