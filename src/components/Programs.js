import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaHandshake, FaProjectDiagram } from 'react-icons/fa';
import './Programs.css';

const Programs = () => {
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
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section id="programs" className="programs">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Programs</h2>
          <p>Comprehensive development opportunities</p>
        </motion.div>
        
        <motion.div 
          className="programs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="program-card" variants={cardVariants}>
            <div className="program-image">
              <FaGraduationCap />
            </div>
            <div className="program-content">
              <h3>Leadership Development</h3>
              <p>Intensive workshops and seminars designed to build essential leadership skills and emotional intelligence.</p>
              <ul>
                <li>Monthly leadership workshops</li>
                <li>One-on-one mentoring</li>
                <li>Leadership assessment tools</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div className="program-card" variants={cardVariants}>
            <div className="program-image">
              <FaHandshake />
            </div>
            <div className="program-content">
              <h3>Networking & Partnerships</h3>
              <p>Connect with industry leaders, entrepreneurs, and fellow ambassadors to build lasting professional relationships.</p>
              <ul>
                <li>Quarterly networking events</li>
                <li>Industry expert panels</li>
                <li>Peer collaboration projects</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div className="program-card" variants={cardVariants}>
            <div className="program-image">
              <FaProjectDiagram />
            </div>
            <div className="program-content">
              <h3>Innovation Projects</h3>
              <p>Work on real-world projects that make a positive impact in your community and beyond.</p>
              <ul>
                <li>Community impact initiatives</li>
                <li>Tech for good projects</li>
                <li>Sustainability programs</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
