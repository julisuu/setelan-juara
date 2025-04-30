import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/';
import SignUp from './pages/signup/';
// Import other pages as needed
// import AboutPage from './pages/about';
// import ContactPage from './pages/contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;