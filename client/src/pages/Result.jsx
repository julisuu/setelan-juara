import React, { useEffect, useState } from 'react';
import '../Result.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Result = () => {
  const [geminiResult, setGeminiResult] = useState([]);
  const [jobTitle, setJobTitle] = useState(''); // State to store the job title
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await fetch('http://localhost:8080/api/result', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Split the result into paragraphs by \n\n, then split each paragraph into lines by \n
          const formattedResult = data.result
            .split('\n\n') // Split into paragraphs
            .map(paragraph => paragraph.split('\n')); // Split each paragraph into lines
          setGeminiResult(formattedResult);
          setJobTitle(data.job); // Set the job title from the response
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch result');
        }
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('An error occurred while fetching the result.');
      }
    };

    fetchResult();
  }, [navigate]);

  return (
    <div className="my-courses-container">
      <header className="my-courses-header">
        <div className="logo-nav-group">
          <img src={logo} alt="SkillVoy Logo" className="logo-image" />
          <h1 className="logo-text">SkillVoy</h1>
          <nav className="left-nav">
            <Link to="/" className="left-nav-link">Home</Link>
            <Link to="/team" className="left-nav-link">Our Team</Link>
          </nav>
        </div>
        <div className="user-info">
          <span>User</span>
          <div className="user-icon">👤</div>
        </div>
      </header>

      <main className="my-courses-main">
        <h1 className="my-courses-title">Skills Roadmap</h1>
        <div className="course-details-container">
          <h2 className="course-title">{jobTitle || 'Your Dream Job'}</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="course-description">
              {geminiResult.map((paragraph, pIndex) => (
                <div key={pIndex} className="paragraph">
                  {paragraph.map((line, lIndex) => {
                    // Split the line into parts: URLs and non-URLs
                    const parts = line.split(/(https?:\/\/[^\s]+)/g);

                    return (
                      <p key={lIndex}>
                        {parts.map((part, index) =>
                          part.startsWith('https://') || part.startsWith('http://') ? (
                            <a
                              key={index}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link"
                            >
                              {part}
                            </a>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                  {pIndex < geminiResult.length - 1 && <br />} {/* Add spacing only if not the last paragraph */}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Result;