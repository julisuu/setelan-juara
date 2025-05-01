import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Team.css';
import logo from '../assets/logo.png';

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: 'Julius Albert Wirayuda',
      role: 'Full Stack Developer',
      description: 'Undergraduate Computer Science Student at Universitas Indonesia',
      image: 'https://csui24.vercel.app/_next/image?url=%2Fimages%2Fjulius-albert-wirayuda.jpg&w=1920&q=75'
    },
    {
      id: 2,
      name: 'Aryandana Pascua Patiung',
      role: 'Frontend Developer',
      description: 'Undergraduate Computer Science Student at Universitas Indonesia',
      image: 'https://scontent.fcgk43-1.fna.fbcdn.net/v/t1.6435-9/140057734_2821105218145000_9220214835702574232_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHJd2Z2ZNatu0b1H2knzB1mQwTx9MFzYqNDBPH0wXNio7WMZfFf2exNrOaXATV_mbYlWss6RqHnjuwY32qRvkUc&_nc_ohc=ZRSTKlfVBJ4Q7kNvwGezQCU&_nc_oc=AdliTNTHc4zZ9RDf8tG0oCTARHv_5OKg85CFqoifMM4xLqu146aJohHYaXy5osK6hDw&_nc_zt=23&_nc_ht=scontent.fcgk43-1.fna&_nc_gid=gKLHnLPVa2ungHRm_6za5A&oh=00_AfFn1i3xLy9GMEhLPlpObK8xk09Kdo4LkrMa6T95Ro7EZA&oe=683991E0'
    },
    {
      id: 3,
      name: 'Salsabila Salimah',
      role: 'UI/UX Enthusiast',
      description: 'Undergraduate Information Systems Student at Universitas Indonesia',
      image: 'https://csui24.vercel.app/_next/image?url=%2Fimages%2Fsalsabila-salimah.jpg&w=1920&q=75'
    }
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
          Back
        </button>
      </main>
    </div>
  );
};

export default Team;