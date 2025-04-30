import React from 'react';
import '../App.css';

export default function About() {
  return (
    <div className="container">
      <div className="about-content">
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
}