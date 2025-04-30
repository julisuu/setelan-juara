import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Result from './pages/Result';
import SignUp from './pages/signup/';
import SignUpTwo from './pages/SignUpTwo';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
};

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
      </Routes>
    </Router>
  );
}

export default App;