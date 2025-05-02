import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../SignUp.css';

const Start = () => {
    const navigate = useNavigate();
    const [dreamJob, setDreamJob] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [educationLevel, setEducationLevel] = useState('');

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

    const countries = [
        { code: 'ID', name: 'Indonesia' },
        { code: 'SG', name: 'Singapore' },
        { code: 'MY', name: 'Malaysia' },
    ];

    const citiesByCountry = {
        'ID': ['Bandung', 'Banjarmasin', 'Depok', 'Jakarta', 'Surabaya'],
        'SG': ['Singapore'],
        'MY': ['Durian Runtuh', 'Johor', 'Kuala Lumpur'],
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/api/quick-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country,
                    city,
                    job: dreamJob,
                    jobType: employmentType,
                    education: educationLevel,
                    birthdate,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                navigate('/result'); // Redirect to the result page
            } else {
                alert(data.error); // Show error from the backend
            }
        } catch (err) {
            console.error('Error during signup:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setCity('');
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
                <button className="login-button" onClick={() => navigate('/start')}>Get Started</button>
            </header>

            <main className="main signup-main">
                <h2 className="signup-title">Let's Build Your Learning Path</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="dreamJob">What's your dream job?</label>
                        <input
                            type="text"
                            id="dreamJob"
                            name="dreamJob"
                            value={dreamJob}
                            onChange={(e) => setDreamJob(e.target.value)}
                            required
                        />
                    </div>

                    {/* Employment Type Dropdown */}
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
                    </div>

                    {/* Education Level Dropdown */}
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Select Country</label>
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={handleCountryChange}
                            required
                        >
                            <option value="" disabled>-- Select Country --</option>
                            {countries.map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">Select City</label>
                        <select
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!country}
                        >
                            <option value="" disabled>-- Select City --</option>
                            {country && citiesByCountry[country] && citiesByCountry[country].map(cityName => (
                                <option key={cityName} value={cityName}>{cityName}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-button next-button">
                        Next
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Start;
