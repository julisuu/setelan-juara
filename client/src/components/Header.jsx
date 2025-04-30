import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Header({ scrollToAbout }) {
  const [activePage, setActivePage] = useState('home');

  const handleLoginClick = () => {
    navigate('/Result'); 
  };

  return (
    <header className="header">
      <div className="logo-nav-group">
        <img src={logo} alt="SkillVoy Logo" className="logo-image" />
        <h1 className="logo-text">SkillVoy</h1>
        <nav className="left-nav">
          <a
            href="#home"
            className={activePage === 'home' ? 'active' : ''}
            onClick={() => setActivePage('home')}
          >
            Home
          </a>
          <a
            href="#about"
            className={activePage === 'about' ? 'active' : ''}
            onClick={() => {
              setActivePage('about');
              scrollToAbout?.();
            }}
          >
            About
          </a>
          <a
            href="#team"
            className={activePage === 'team' ? 'active' : ''}
            onClick={() => setActivePage('team')}
          >
            Our Team
          </a>
        </nav>
      </div>
      <button className="login-button">Login</button>
    </header>
  );
}
