import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png'; // Import logo

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    // Data team members (tetap sama seperti sebelumnya)
  ];

  return (
    <div className="container">
      {/* Header dengan logo persis seperti di Home */}
      <header className="header">
        <div className="logo-nav-group">
          <img src={logo} alt="SkillVoy Logo" className="logo-image" />
          <h1 className="logo-text">SkillVoy</h1>
          <nav className="left-nav">
            <a href="/">Home</a>
            <a href="#about">About</a>
            <a href="#team" className="active">Our Team</a>
          </nav>
        </div>
        <button className="login-button">Login</button>
      </header>

      {/* Konten Team (tetap sama) */}
      <main className="team-main">
        <h1 className="team-title">Meet Our Team</h1>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <img src={member.image} alt={member.name} className="team-avatar" />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-description">{member.description}</p>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </main>
    </div>
  );
};

export default Team;