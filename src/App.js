import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Ambassadors from './components/Ambassadors';
import Impact from './components/Impact';
import Join from './components/Join';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommunicationHub from './components/CommunicationHub';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Simple admin authentication (in production, use proper authentication)
  const handleAdminLogin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'ffga2025') {
      setIsAdmin(true);
      alert('Admin access granted!');
    } else {
      alert('Invalid password!');
    }
  };

  const MainContent = () => (
    <>
      <Navbar onAdminClick={handleAdminLogin} />
      <Hero />
      <About />
      <Programs />
      <Ambassadors />
      <Impact />
      <CommunicationHub />
      <Join />
      <Contact />
      <Footer />
    </>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminDashboard /> : <MainContent />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
