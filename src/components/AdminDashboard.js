import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaVideo, FaRobot, FaEdit, FaEye, FaCog } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalMeetings, setTotalMeetings] = useState(0);
  const [chatbotInteractions, setChatbotInteractions] = useState(0);
  const [selectedSection, setSelectedSection] = useState('overview');

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 10);
      setTotalMeetings(Math.floor(Math.random() * 20) + 5);
      setChatbotInteractions(Math.floor(Math.random() * 100) + 20);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: FaUsers, title: 'Active Users', value: activeUsers, color: '#4CAF50' },
    { icon: FaVideo, title: 'Active Meetings', value: totalMeetings, color: '#2196F3' },
    { icon: FaRobot, title: 'Chatbot Interactions', value: chatbotInteractions, color: '#FF9800' },
    { icon: FaComments, title: 'Messages Today', value: 156, color: '#9C27B0' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaEye },
    { id: 'content', label: 'Content Management', icon: FaEdit },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'communications', label: 'Communications', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="admin-overview">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stat-icon" style={{ color: stat.color }}>
                    <stat.icon />
                  </div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="activity-feed">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">2 min ago</span>
                  <span className="activity-text">New user joined the platform</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">5 min ago</span>
                  <span className="activity-text">Meeting "Youth Leadership" started</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">8 min ago</span>
                  <span className="activity-text">Chatbot answered 15 questions</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="content-management">
            <h3>Content Management</h3>
            <div className="content-sections">
              <div className="content-card">
                <h4>Hero Section</h4>
                <button className="edit-btn">Edit Content</button>
              </div>
              <div className="content-card">
                <h4>About Section</h4>
                <button className="edit-btn">Edit Content</button>
              </div>
              <div className="content-card">
                <h4>Programs</h4>
                <button className="edit-btn">Edit Content</button>
              </div>
              <div className="content-card">
                <h4>Ambassadors</h4>
                <button className="edit-btn">Edit Content</button>
              </div>
            </div>
          </div>
        );
      case 'communications':
        return (
          <div className="communications-panel">
            <h3>Communication Tools</h3>
            <div className="comm-tools">
              <div className="tool-card">
                <FaVideo className="tool-icon" />
                <h4>Video Calls</h4>
                <p>Manage video conference rooms</p>
                <button className="tool-btn">Manage</button>
              </div>
              <div className="tool-card">
                <FaComments className="tool-icon" />
                <h4>Meetings</h4>
                <p>Schedule and manage meetings</p>
                <button className="tool-btn">Manage</button>
              </div>
              <div className="tool-card">
                <FaRobot className="tool-icon" />
                <h4>Chatbots</h4>
                <p>Configure AI assistants</p>
                <button className="tool-btn">Configure</button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your FFGA platform</p>
      </div>
      
      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${selectedSection === item.id ? 'active' : ''}`}
                onClick={() => setSelectedSection(item.id)}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="admin-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
