import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Join.css';

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    motivation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      country: '',
      motivation: ''
    });
  };

  return (
    <section id="join" className="join">
      <div className="container">
        <motion.div 
          className="join-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Join us in shaping the future!</h2>
          <p>Become a Future Forward Generation Ambassador and be part of a dynamic community driving positive change.</p>
          
          <motion.div 
            className="join-form"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Your Country"
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Tell us why you want to become an ambassador..."
                  rows="4"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                Apply to Become an Ambassador
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Join;
