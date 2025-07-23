import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaUsers, FaChartLine } from 'react-icons/fa';
import './About.css';

const About = () => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>About FFGA</h2>
          <p>Building tomorrow's leaders today</p>
        </motion.div>
        
        <motion.div 
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="about-card" variants={cardVariants}>
            <div className="card-icon">
              <FaLightbulb />
            </div>
            <h3>Innovation</h3>
            <p>We foster creative thinking and innovative solutions to tackle tomorrow's challenges.</p>
          </motion.div>
          
          <motion.div className="about-card" variants={cardVariants}>
            <div className="card-icon">
              <FaUsers />
            </div>
            <h3>Community</h3>
            <p>Building a strong network of young leaders who support and inspire each other.</p>
          </motion.div>
          
          <motion.div className="about-card" variants={cardVariants}>
            <div className="card-icon">
              <FaChartLine />
            </div>
            <h3>Growth</h3>
            <p>Providing opportunities for personal and professional development through mentorship and training.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
