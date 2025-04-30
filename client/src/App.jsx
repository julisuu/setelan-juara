import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Result from './pages/Result'; // Import komponen Result

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/result" element={<Result />} /> {/* Tambahkan route untuk Result */}
      </Routes>
    </Router>
  );
}

export default App;