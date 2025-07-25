import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Ambassadors from './components/Ambassadors';
import Impact from './components/Impact';
import Join from './components/Join';
import Empowerment from './components/Empowerment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommunicationHub from './components/CommunicationHub';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContent setIsAdmin={setIsAdmin} />} />
          <Route 
            path="/admin" 
            element={<AdminDashboard />} 
          />
          <Route 
            path="/dashboard" 
            element={<UserDashboard />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent({ setIsAdmin }) {
  const navigate = useNavigate();

  // Simple admin authentication (in production, use proper authentication)
  const handleAdminLogin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'ffga2025') {
      setIsAdmin(true);
      alert('Admin access granted! Redirecting to dashboard...');
      navigate('/admin');
    } else {
      alert('Invalid password!');
    }
  };

  return (
    <>
      <Navbar onAdminClick={handleAdminLogin} />
      <Hero />
      <About />
      <Programs />
      <Ambassadors />
      <Impact />
      <CommunicationHub />
      <Join />
      <Empowerment />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
