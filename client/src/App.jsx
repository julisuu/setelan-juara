import React from 'react';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo-nav-group">
          <img src={logo} alt="SkillVoy Logo" className="logo-image" />
          <h1 className="logo-text">SkillVoy</h1>
          <nav className="left-nav">
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <button className="login-button">Login</button>
      </header>

      <main className="main">
        <h2 className="title">
          <span className="highlight">Voyage</span> To Your Dream Job
        </h2>
        <p className="subtitle">With AI Curated Learning Path</p>
        <p className="no-degrees">No Degrees Needed</p>
        <button className="start-button">Start Your Voyage</button>
      </main>
    </div>
  );
};

export default App;
