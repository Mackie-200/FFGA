import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaComments, FaRobot, FaUsers, FaCog } from 'react-icons/fa';
import MeetingSection from './MeetingSection';
import VideoCallSection from './VideoCallSection';
import ChatbotSection from './ChatbotSection';
import './CommunicationHub.css';

const CommunicationHub = () => {
  const [activeSection, setActiveSection] = useState('meetings');

  const sections = [
    { id: 'meetings', label: 'Meetings', icon: FaComments, component: MeetingSection },
    { id: 'video', label: 'Video Calls', icon: FaVideo, component: VideoCallSection },
    { id: 'chatbot', label: 'AI Assistant', icon: FaRobot, component: ChatbotSection }
  ];

  const renderActiveSection = () => {
    const activeComponent = sections.find(section => section.id === activeSection);
    if (activeComponent) {
      const Component = activeComponent.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="communication-hub" id="communication">
      <div className="hub-header">
        <div className="header-content">
          <img src="/images/logo.jpg" alt="FFGA Logo" className="hub-logo" />
          <div className="header-text">
            <h2>Communication Hub</h2>
            <p>Connect, collaborate, and engage with the FFGA community</p>
          </div>
        </div>
        
        <div className="section-tabs">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`tab-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <section.icon className="tab-icon" />
              <span>{section.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        className="section-content"
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderActiveSection()}
      </motion.div>
    </div>
  );
};

export default CommunicationHub;
