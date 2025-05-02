import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import {useLocation} from 'react-router-dom';

const Home = () => {
  const [activePage, setActivePage] = useState('home');
  const aboutSectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault();
    setActivePage('about');
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartVoyageClick = () => {
    navigate('/start'); // Navigasi ke halaman signup
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigasi ke halaman login
  };

  useEffect(() => {
    // Check if the state indicates scrolling to the "About" section
    if (location.state?.scrollToAbout) {
      aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

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
        <button className="login-button" onClick={() => navigate('/start')}>Get Started</button>
      </header>

      <main className="main">
        <h2 className="title">
          <span className="highlight">Voyage</span>  To Your Dream Job
        </h2>
        <p className="subtitle">Through AI-Personalized Learning Paths To Real Careers</p>
        <p className="no-degrees">No Formal Degree Required</p>
        <button onClick={handleStartVoyageClick} className="start-button">
          Start Your Journey
        </button>
      </main>

      <div ref={aboutSectionRef} id="about" className="sv-about-section">
        <h1 className="sv-about-heading">About SkillVoy</h1>
        
        <div className="sv-about-cards">
          {/* What Is SkillVoy Card */}
          <div className="sv-about-card">
            <h2 className="sv-about-card-title">What is SkillVoy?</h2>
            <p className="sv-about-card-description">
            SkillVoy is an AI-powered learning platform built to create equal job 
            opportunities for everyone — regardless of their education level or 
            socio-economic background.
            </p>
          </div>

          {/* Vision Card */}
          <div className="sv-about-card">
            <h2 className="sv-about-card-title">Our Vision</h2>
            <p className="sv-about-card-description">
            A world where anyone, from any background, can unlock career opportunities 
            through accessible, practical learning.
            </p>
          </div>

          {/* Mission Card */}
          <div className="sv-about-card">
            <h2 className="sv-about-card-title">Our Mission</h2>
            <p className="sv-about-card-description">
            To create equal access to careers by removing barriers like high educational 
            cost, limited access to institutions, and outdated hiring standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;