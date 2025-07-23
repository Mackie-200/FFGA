import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <h2>FFGA</h2>
          <span>Future Forward Generation Ambassadors</span>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#programs" className="nav-link" onClick={() => scrollToSection('programs')}>
              Programs
            </a>
          </li>
          <li className="nav-item">
            <a href="#ambassadors" className="nav-link" onClick={() => scrollToSection('ambassadors')}>
              Ambassadors
            </a>
          </li>
          <li className="nav-item">
            <a href="#impact" className="nav-link" onClick={() => scrollToSection('impact')}>
              Impact
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="#join" className="nav-link cta-button" onClick={() => scrollToSection('join')}>
              Join Us
            </a>
          </li>
        </ul>
        
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
