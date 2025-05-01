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

    const validateForm = () => {
        let errors = {};
        if (!dreamJob.trim()) errors.dreamJob = "Dream job is required";
        if (!employmentType) errors.employmentType = "Employment type is required";
        if (!educationLevel) errors.educationLevel = "Education level is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Submitted:', {
                dreamJob,
                employmentType,
                educationLevel,
            });
            // alert('Form data logged to console.');   <-- Hapus alert ini
            navigate('/result');   // Navigasi ke /result
        }
    };

    return (
        <div className="container">
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

            <main className="main form-page">
                <h1 className="title">
                    Start Your Voyage!
                </h1>
                <form onSubmit={handleSubmit} className="voyage-form">
                    <div className="form-group">
                        <label htmlFor="dreamJob">What's your dream job?</label>
                        <input
                            type="text"
                            id="dreamJob"
                            value={dreamJob}
                            onChange={(e) => setDreamJob(e.target.value)}
                            required
                        />
                        {formErrors.dreamJob && <p className="form-error">{formErrors.dreamJob}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="employmentType">Full Time / Part Time</label>
                        <select
                            id="employmentType"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            required
                        >
                            {employmentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formErrors.employmentType && <p className="form-error">{formErrors.employmentType}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="educationLevel">Education</label>
                        <select
                            id="educationLevel"
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            required
                        >
                            {educationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {formErrors.educationLevel && <p className="form-error">{formErrors.educationLevel}</p>}
                    </div>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SignUpTwo;