import React from 'react';
import { motion } from 'framer-motion';
import './Impact.css';

const Impact = () => {
  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
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
    <section id="impact" className="impact">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Impact</h2>
          <p>Making a difference together</p>
        </motion.div>
        
        <motion.div 
          className="impact-stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="stat-card" variants={statVariants}>
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Ambassadors</div>
          </motion.div>
          
          <motion.div className="stat-card" variants={statVariants}>
            <div className="stat-number">50+</div>
            <div className="stat-label">Countries Represented</div>
          </motion.div>
          
          <motion.div className="stat-card" variants={statVariants}>
            <div className="stat-number">100+</div>
            <div className="stat-label">Projects Completed</div>
          </motion.div>
          
          <motion.div className="stat-card" variants={statVariants}>
            <div className="stat-number">1M+</div>
            <div className="stat-label">Lives Impacted</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
