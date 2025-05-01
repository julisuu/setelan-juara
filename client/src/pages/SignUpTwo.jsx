import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../SignUpTwo.css';
import logo from '../assets/logo.png';

const SignUpTwo = () => {
    const navigate = useNavigate();
    const [dreamJob, setDreamJob] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const employmentOptions = [
        { value: '', label: 'Select...' },
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
    ];

    const educationOptions = [
        { value: '', label: 'Select...' },
        { value: 'high-school', label: 'High School' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelor', label: 'Bachelor Degree' },
        { value: 'master', label: 'Master Degree' },
        { value: 'doctorate', label: 'Doctorate' },
    ];

    // Validate form inputs
    const validateForm = () => {
        let errors = {};
        if (!dreamJob.trim()) errors.dreamJob = "Dream job is required";
        if (!employmentType) errors.employmentType = "Employment type is required";
        if (!educationLevel) errors.educationLevel = "Education level is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Retrieve personal information from localStorage
            const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
            if (!personalInfo) {
                alert('Personal information is missing. Please start from the signup page.');
                navigate('/signup');
                return;
            }

            // Send data to the backend
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...personalInfo,
                    job: dreamJob,
                    jobType: employmentType,
                    education: educationLevel,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);

                // Redirect to the result page
                navigate('/result');
            } else {
                alert(data.error); // Show backend error
            }
        } catch (err) {
            console.error('Signup error:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            {/* Header Section */}
            <header className="header">
                <div className="logo-nav-group">
                    <img src={logo} alt="SkillVoy Logo" className="logo-image" />
                    <h1 className="logo-text">SkillVoy</h1>
                    <nav className="left-nav">
                        <Link to="/">Home</Link>
                        <Link to="/team">Our Team</Link>
                    </nav>
                </div>
                <button className="login-button">Login</button>
            </header>

            {/* Main Form Section */}
            <main className="main form-page">
                <h1 className="title">Start Your Voyage!</h1>
                <form onSubmit={handleSubmit} className="voyage-form">
                    {/* Dream Job Input */}
                    <div className="form-group">
                        <label htmlFor="dreamJob">What's your dream job?</label>
                        <input
                            type="text"
                            id="dreamJob"
                            value={dreamJob}
                            onChange={(e) => setDreamJob(e.target.value)}
                        />
                        {formErrors.dreamJob && <p className="form-error">{formErrors.dreamJob}</p>}
                    </div>

                    {/* Employment Type Dropdown */}
                    <div className="form-group">
                        <label htmlFor="employmentType">Full Time / Part Time</label>
                        <select
                            id="employmentType"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                        >
                            {employmentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formErrors.employmentType && <p className="form-error">{formErrors.employmentType}</p>}
                    </div>

                    {/* Education Level Dropdown */}
                    <div className="form-group">
                        <label htmlFor="educationLevel">Education</label>
                        <select
                            id="educationLevel"
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                        >
                            {educationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formErrors.educationLevel && <p className="form-error">{formErrors.educationLevel}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SignUpTwo;