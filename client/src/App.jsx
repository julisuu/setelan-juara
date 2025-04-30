import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
// Import other pages as needed
// import AboutPage from './pages/about';
// import ContactPage from './pages/contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add other routes as needed */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;