import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Home = () => {
  const [activePage, setActivePage] = useState('home');
  const aboutSectionRef = useRef(null);
  const navigate = useNavigate();

  const handleAboutClick = (e) => {
    e.preventDefault();
    setActivePage('about');
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartVoyageClick = () => {
    navigate('/signup'); // Navigasi ke halaman signup
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-nav-group">
          <img src={logo} alt="SkillVoy Logo" className="logo-image" />
          <h1 className="logo-text">SkillVoy</h1>
          <nav className="left-nav">
            <Link
              to="/"
              className={activePage === 'home' ? 'active' : ''}
              onClick={() => setActivePage('home')}
            >
              Home
            </Link>
            <a
              href="#about"
              className={activePage === 'about' ? 'active' : ''}
              onClick={handleAboutClick}
            >
              About
            </a>
            <Link
              to="/team"
              className={activePage === 'team' ? 'active' : ''}
              onClick={() => setActivePage('team')}
            >
              Our Team
            </Link>
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
        <button onClick={handleStartVoyageClick} className="start-button">
          Start Your Voyage
        </button>
      </main>

      <div ref={aboutSectionRef} id="about" className="about-content">
        <h1 className="about-title">What is SkillVoy?</h1>
        <p className="about-description">
          SkillVoy is an innovative platform designed to help you navigate your career journey
          without the need for traditional degrees. Our AI-powered system curates personalized
          learning paths tailored to your dream job, providing you with the exact skills and
          knowledge you need to succeed in today's competitive market.
        </p>
        <p className="about-description">
          Whether you're looking to switch careers, upskill, or start your professional journey,
          SkillVoy provides the roadmap to get you there efficiently and effectively.
        </p>
      </div>
    </div>
  );
};

export default Home;
