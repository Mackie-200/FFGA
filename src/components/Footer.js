import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-section">
            <h3>FFGA</h3>
            <p>Empowering the next generation of leaders through innovation, creativity, and progress.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
              <li><a href="#programs" onClick={() => scrollToSection('programs')}>Programs</a></li>
              <li><a href="#impact" onClick={() => scrollToSection('impact')}>Impact</a></li>
              <li><a href="#join" onClick={() => scrollToSection('join')}>Join Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Programs</h4>
            <ul>
              <li><a href="#programs">Leadership Development</a></li>
              <li><a href="#programs">Networking</a></li>
              <li><a href="#programs">Innovation Projects</a></li>
              <li><a href="#programs">Mentorship</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>hello@ffga.org</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </motion.div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Future Forward Generation Ambassadors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
