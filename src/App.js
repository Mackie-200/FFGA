import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Ambassadors from './components/Ambassadors';
import Impact from './components/Impact';
import Join from './components/Join';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Programs />
        <Ambassadors />
        <Impact />
        <Join />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
