import React from 'react';
import '../Result.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Result = () => {
  return (
    <div className="my-courses-container">
      <header className="my-courses-header">
        <div className="logo-nav-group">
          <img src={logo} alt="SkillVoy Logo" className="logo-image" />
          <h1 className="logo-text">SkillVoy</h1>
          <nav className="left-nav">
            <Link to="/" className="left-nav-link">About Us</Link>
            <Link to="/contact" className="left-nav-link">Contact</Link>
          </nav>
        </div>
        <div className="user-info">
          <span>User</span>
          <div className="user-icon">
            👤
          </div>
        </div>
      </header>

      <main className="my-courses-main">
        <h1 className="my-courses-title">My Courses</h1>
        <div className="course-details-container">
          <h2 className="course-title">Web Development</h2>
          <p className="course-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, libero ac egestas tincidunt, ligula nulla placerat leo, non gravida nunc libero sit amet lorem. Sed eget libero vel augue faucibus tristique. Vestibulum at eros at turpis mollis vulputate. Integer nec turpis nisl. Nunc a fermentum odio. Proin mollis dolor sed est mollis, et mollis nisi cursus. Ut sit amet consectetur augue.
          </p>
        </div>

        <div className="course-cards">
          {/* Dummy Course Cards - Replace with dynamic data if needed */}
          <div className="course-card">
            <div className="course-number">1</div>
            <div className="course-card-content">
              TITTLE
            </div>
            <div className="course-arrow">
              &gt;
            </div>
          </div>
          <div className="course-card">
            <div className="course-number">1</div>
            <div className="course-card-content">
              TITTLE
            </div>
            <div className="course-arrow">
              &gt;
            </div>
          </div>
          <div className="course-card">
            <div className="course-number">1</div>
            <div className="course-card-content">
              TITTLE
            </div>
            <div className="course-arrow">
              &gt;
            </div>
          </div>
        </div>

        <button className="back-button">
          &lt; Back
        </button>
      </main>
    </div>
  );
};

export default Result;