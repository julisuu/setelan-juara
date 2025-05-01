import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dreamJob: '',
    employmentType: '',
    educationLevel: ''
  });

  const employmentOptions = [
    { value: '', label: 'Select...' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' }
  ];

  const educationOptions = [
    { value: '', label: 'Select...' },
    { value: 'high-school', label: 'High School' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/result');
  };

  return (
    <div className="cf-form-page"> {/* Tetap menggunakan class ini karena sudah ada di Login.css */}
      <h1 className="cf-form-title">Start Your Voyage!</h1> {/* Tetap menggunakan class ini */}

      <form onSubmit={handleSubmit} className="cf-form"> {/* Tetap menggunakan class ini */}
        <div className="cf-form-group"> {/* Tetap menggunakan class ini */}
          <label>What's your dream job?</label>
          <input
            type="text"
            name="dreamJob"
            value={formData.dreamJob}
            onChange={handleChange}
            placeholder="Enter your dream job"
          />
        </div>

        <div className="cf-form-group"> {/* Tetap menggunakan class ini */}
          <label>Full Time / Part Time</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            {employmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="cf-form-group"> {/* Tetap menggunakan class ini */}
          <label>Education</label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            {educationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="cf-submit-button"> {/* Tetap menggunakan class ini */}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;