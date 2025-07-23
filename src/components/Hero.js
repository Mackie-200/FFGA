import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaUsers, FaGlobe } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            Empowering the <span className="highlight">Next Generation</span> of Leaders
          </motion.h1>
          
          <motion.p className="hero-description" variants={itemVariants}>
            Future Forward Generation Ambassadors is a dynamic organization dedicated to fostering innovation, creativity, and progress. Our mission is to inspire and equip young individuals with the skills, knowledge, and networks needed to shape a brighter future.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('join')}
            >
              Become an Ambassador
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        <div className="hero-visual">
          <div className="floating-elements">
            <motion.div 
              className="element element-1"
              variants={floatingVariants}
              animate="animate"
            >
              <FaLightbulb />
            </motion.div>
            <motion.div 
              className="element element-2"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 1 }}
            >
              <FaRocket />
            </motion.div>
            <motion.div 
              className="element element-3"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 2 }}
            >
              <FaUsers />
            </motion.div>
            <motion.div 
              className="element element-4"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 3 }}
            >
              <FaGlobe />
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-gradient"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="scroll-arrow" onClick={() => scrollToSection('about')}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
