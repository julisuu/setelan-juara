import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

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

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate required fields
        if (!firstName || !lastName || !birthdate || !email || !password || !country || !city) {
            alert('Please fill in all required fields.');
            return;
        }

        // Save personal information to localStorage
        const info = {
            firstName,
            lastName,
            birthdate,
            email,
            password,
            country,
            city,
        };
        localStorage.setItem('personalInfo', JSON.stringify(info));

        // Navigate to the next step
        navigate('/signuptwo');
    };

    // Handle country selection change
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setCity(''); // Reset city when country changes
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
                <button className="login-button" onClick={() => alert('Navigate to Login page')}>Login</button>
            </header>

            {/* Main Form Section */}
            <main className="main signup-main">
                <h2 className="signup-title">Sign up</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    {/* First Name and Last Name */}
                    <div className="form-row">
                        <div className="form-group form-group-half">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group form-group-half">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Birthdate */}
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

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                        />
                    </div>

                    {/* Country Selection */}
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

                    {/* City Selection */}
                    <div className="form-group">
                        <label htmlFor="city">Select City</label>
                        <select
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!country} // Disable if no country is selected
                        >
                            <option value="" disabled>-- Select City --</option>
                            {country && citiesByCountry[country] && citiesByCountry[country].map(cityName => (
                                <option key={cityName} value={cityName}>{cityName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button next-button"
                        disabled={!firstName || !lastName || !birthdate || !email || !password || !country || !city} // Disable if fields are incomplete
                    >
                        Next
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SignUp;