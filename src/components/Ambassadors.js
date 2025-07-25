import React from 'react';
import { motion } from 'framer-motion';
import './Ambassadors.css';

const Ambassadors = () => {
  // Sample ambassador data - you can replace with real data
  const ambassadors = [
    {
      id: 1,
      name: "Nhinga Tinotenda",
      title: "Founding Ambassador",
      location: "Crowborough North phase 2",
      bio: "Passionate leader dedicated to empowering the next generation through innovation and community building. Committed to creating positive change and fostering growth.",
      image: "/images/ambassador.jpg", 
      achievements: ["FFGA Founding Member", "Community Leader", "Innovation Advocate"]
    },
    {
      id: 2,
      name: "Chirumezani McDonald",
      title: "Innovation Ambassador",
      location: "Harare, Zimbabwe",
      bio: "AI researcher and community builder focused on bridging the gap between technology and social impact.",
      image: "/images/mac.jpg", 
      achievements: ["Published 15 research papers", "Built 5 AI for good projects", "Organized 20+ workshops"]
    },
    {
      id: 3,
      name: "Amara Okafor",
      title: "Community Ambassador",
      location: "Lagos, Nigeria",
      bio: "Social entrepreneur dedicated to education access and digital literacy in underserved communities.",
      image: "/images/ambassador3.jpg", // You can replace with actual image path
      achievements: ["Reached 10,000+ students", "Built 50 digital labs", "Award-winning educator"]
    }
  ];

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
    <section id="ambassadors" className="ambassadors">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Meet Our Ambassadors</h2>
          <p>Inspiring leaders making a difference around the world</p>
        </motion.div>
        
        <motion.div 
          className="ambassadors-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ambassadors.map((ambassador) => (
            <motion.div 
              key={ambassador.id} 
              className="ambassador-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="ambassador-image">
                <img 
                  src={ambassador.image} 
                  alt={ambassador.name}
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't load
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ambassador.name)}&background=6366f1&color=fff&size=300`;
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h4>{ambassador.title}</h4>
                    <p>{ambassador.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="ambassador-content">
                <h3>{ambassador.name}</h3>
                <p className="ambassador-bio">{ambassador.bio}</p>
                
                <div className="achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {ambassador.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="join-ambassadors-cta"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Join Our Ambassador Community?</h3>
          <p>Become part of a global network of young leaders driving positive change</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              const element = document.getElementById('join');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Ambassadors;
