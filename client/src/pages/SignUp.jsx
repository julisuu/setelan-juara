import { useState } from 'react'; // Make sure useState is imported
import logo from '../assets/logo.png';
import '../SignUp.css';

const SignUp = () => {
    // State for each form field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    // --- Mock Data for Select Options (Replace with actual data/API calls) ---
    const countries = [
        { code: 'ID', name: 'Indonesia' },
        { code: 'SG', name: 'Singapore' },
        { code: 'MY', name: 'Malaysia' },
        // Add more countries
    ];

    const citiesByCountry = {
        'ID': ['Bandung', 'Banjarmasin', 'Depok', 'Jakarta', 'Surabaya'],
        'SG': ['Singapore'],
        'MY': ['Durian Runtuh', 'Johor', 'Kuala Lumpur'],
        // Add more cities per country
    };
    // --- End Mock Data ---

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default page reload
        console.log('Form Submitted:', {
            firstName,
            lastName,
            birthdate,
            email,
            // Avoid logging passwords in real apps, but shown here for completeness
            password,
            country,
            city,
        });
        // TODO: Add actual submission logic here (e.g., API call)
        alert('Sign up data logged to console. Implement API call next.');
        // TODO: Navigate to the next step/page
    };

    // Handle country change to potentially reset city or fetch new cities
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setCity(''); // Reset city when country changes
        // TODO: If fetching cities dynamically, trigger fetch here
    };


    return (
      <div className="container">
        {/* Your existing header */}
        <header className="header">
          <div className="logo-nav-group">
            <img src={logo} alt="SkillVoy Logo" className="logo-image" />
            <h1 className="logo-text">SkillVoy</h1>
            <nav className="left-nav">
              {/* Use Link from react-router-dom if using routing */}
              <a href="/about">About Us</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          {/* Use Link from react-router-dom if using routing */}
          <button className="login-button" onClick={() => alert('Navigate to Login page')}>Login</button>
        </header>

        {/* Main Content Area with Sign Up Form */}
        <main className="main signup-main">
            <h2 className="signup-title">Sign up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                {/* First Name and Last Name Row */}
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required // Add basic validation
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
                        type="date" // Use date type for better UX
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
                        type="email" // Use email type for validation
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
                        minLength="8" // Example: Enforce minimum length
                    />
                </div>

                {/* Country Select */}
                <div className="form-group">
                    <label htmlFor="country">Select Country</label>
                    <select
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleCountryChange} // Use specific handler
                        required
                    >
                        <option value="" disabled>-- Select Country --</option>
                        {countries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* City Select - Enabled only when a country is selected */}
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
                <button type="submit" className="submit-button next-button">
                    Next
                </button>
            </form>
        </main>
      </div>
    );
  };

  export default SignUp;