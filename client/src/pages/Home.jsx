import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
// Kita perlu mengimpor gambar untuk section about
// Sebagai contoh, gunakan placeholder jika asset belum tersedia
// import whatIsImg from '../assets/what-is.png';
// import visionImg from '../assets/vision.png';
// import missionImg from '../assets/mission.png';

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

  const handleLoginClick = () => {
    navigate('/login'); // Navigasi ke halaman login
  };

  // Placeholder untuk gambar jika belum ada asset
  const placeholderImages = {
    whatIs: "https://via.placeholder.com/300x200?text=What+Is+SkillVoy",
    vision: "https://via.placeholder.com/300x200?text=Our+Vision",
    mission: "https://via.placeholder.com/300x200?text=Our+Mission"
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
        <button className="login-button" onClick={handleLoginClick}>Login</button>
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

      <div ref={aboutSectionRef} id="about" className="sv-about-section">
        <h1 className="sv-about-heading">About SkillVoy</h1>
        
        <div className="sv-about-cards">
          {/* What Is SkillVoy Card */}
          <div className="sv-about-card">
            <div className="sv-about-card-image-container">
              {/* Gunakan img import jika sudah ada, atau placeholder */}
              <img 
                src={placeholderImages.whatIs} 
                alt="What Is SkillVoy" 
                className="sv-about-card-image" 
              />
            </div>
            <h2 className="sv-about-card-title">What is SkillVoy?</h2>
            <p className="sv-about-card-description">
              SkillVoy is an innovative platform designed to help you navigate your career journey
              without the need for traditional degrees. Our AI-powered system curates personalized
              learning paths tailored to your dream job, providing you with the exact skills and
              knowledge you need to succeed.
            </p>
          </div>

          {/* Vision Card */}
          <div className="sv-about-card">
            <div className="sv-about-card-image-container">
              <img 
                src={placeholderImages.vision} 
                alt="Our Vision" 
                className="sv-about-card-image" 
              />
            </div>
            <h2 className="sv-about-card-title">Our Vision</h2>
            <p className="sv-about-card-description">
              We envision a world where career opportunities are accessible to everyone, regardless of their educational background. 
              SkillVoy aims to bridge the gap between talent and industry by focusing on skills-based qualifications rather than 
              traditional credentials, creating a more inclusive and dynamic workforce.
            </p>
          </div>

          {/* Mission Card */}
          <div className="sv-about-card">
            <div className="sv-about-card-image-container">
              <img 
                src={placeholderImages.mission} 
                alt="Our Mission" 
                className="sv-about-card-image" 
              />
            </div>
            <h2 className="sv-about-card-title">Our Mission</h2>
            <p className="sv-about-card-description">
              Our mission is to democratize career advancement by providing accessible, 
              personalized learning paths for everyone. We're committed to helping individuals 
              discover their potential, develop job-ready skills, and connect with opportunities 
              that match their abilities and aspirations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;