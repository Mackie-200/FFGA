import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaClipboardList, FaComments, FaCog, FaSignOutAlt, FaEye, FaEdit, FaBell, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [loginForm, setLoginForm] = useState({ email: '', code: '' });
  const [loginStep, setLoginStep] = useState('email'); // 'email', 'code'
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  // Mock user data - in production, this would come from your backend
  const [userData, setUserData] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 25,
      location: 'Lagos, Nigeria',
      joinDate: '2024-01-15'
    },
    applications: [
      {
        id: 1,
        type: 'Ambassador',
        status: 'Under Review',
        submittedDate: '2024-01-20',
        lastUpdate: '2024-01-22',
        details: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          country: 'Nigeria',
          motivation: 'I want to make a positive impact in my community...'
        }
      }
    ],
    empowermentRequests: [
      {
        id: 1,
        status: 'Assessment',
        submittedDate: '2024-01-18',
        lastUpdate: '2024-01-21',
        details: {
          problem: 'Need support with education funding...',
          motivation: 'Want to complete my degree...',
          supportNeeded: 'Financial assistance and mentorship'
        }
      }
    ],
    messages: [
      {
        id: 1,
        from: 'FFGA Team',
        subject: 'Application Update',
        message: 'Your ambassador application is currently under review. We will update you within 5 business days.',
        date: '2024-01-22',
        read: false
      },
      {
        id: 2,
        from: 'Support Team',
        subject: 'Welcome to FFGA',
        message: 'Thank you for your interest in joining FFGA. We are excited to review your application.',
        date: '2024-01-20',
        read: true
      }
    ]
  });

  // Generate login code and simulate sending
  const generateLoginCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginStatus('');

    try {
      // Simulate sending login code to email
      const code = generateLoginCode();
      localStorage.setItem('loginCode', code); // In production, this would be server-side
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoginStep('code');
      setLoginStatus('code-sent');
    } catch (error) {
      setLoginStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const storedCode = localStorage.getItem('loginCode');
      
      if (loginForm.code === storedCode) {
        // Simulate user data fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCurrentUser({ email: loginForm.email });
        setIsLoggedIn(true);
        setLoginStatus('success');
        localStorage.removeItem('loginCode');
      } else {
        setLoginStatus('invalid-code');
      }
    } catch (error) {
      setLoginStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveSection('overview');
    setLoginForm({ email: '', code: '' });
    setLoginStep('email');
    setLoginStatus('');
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <FaCheckCircle className="status-icon approved" />;
      case 'under review':
      case 'assessment':
        return <FaClock className="status-icon pending" />;
      case 'rejected':
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'under review':
      case 'assessment':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaUser },
    { id: 'applications', label: 'My Applications', icon: FaClipboardList },
    { id: 'messages', label: 'Messages', icon: FaComments },
    { id: 'profile', label: 'Profile', icon: FaCog }
  ];

  const renderLoginForm = () => (
    <div className="login-container">
      <motion.div 
        className="login-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Access Your Dashboard</h2>
        <p>Enter your email to receive a login code</p>

        {loginStep === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="Enter your email address"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Code...' : 'Send Login Code'}
            </button>

            {loginStatus === 'code-sent' && (
              <div className="login-message success">
                <p>📧 Login code sent to {loginForm.email}!</p>
              </div>
            )}

            {loginStatus === 'error' && (
              <div className="login-message error">
                <p>❌ Error sending login code. Please try again.</p>
              </div>
            )}
          </form>
        )}

        {loginStep === 'code' && (
          <form onSubmit={handleCodeSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={loginForm.code}
                onChange={(e) => setLoginForm({ ...loginForm, code: e.target.value })}
                placeholder="Enter 6-digit login code"
                maxLength="6"
                required
                className="code-input"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isLoading || loginForm.code.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Access Dashboard'}
            </button>

            <button 
              type="button" 
              className="btn btn-link"
              onClick={() => setLoginStep('email')}
            >
              Back to Email
            </button>

            {loginStatus === 'invalid-code' && (
              <div className="login-message error">
                <p>❌ Invalid code. Please check your email and try again.</p>
              </div>
            )}

            {loginStatus === 'error' && (
              <div className="login-message error">
                <p>❌ Error verifying code. Please try again.</p>
              </div>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="welcome-section">
        <h2>Welcome back, {userData.profile.name}!</h2>
        <p>Here's what's happening with your FFGA journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <h3>{userData.applications.length}</h3>
            <p>Ambassador Applications</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUser />
          </div>
          <div className="stat-info">
            <h3>{userData.empowermentRequests.length}</h3>
            <p>Empowerment Requests</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaComments />
          </div>
          <div className="stat-info">
            <h3>{userData.messages.filter(m => !m.read).length}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {userData.applications.map(app => (
            <div key={app.id} className="activity-item">
              {getStatusIcon(app.status)}
              <div className="activity-content">
                <p><strong>Ambassador Application</strong> - {app.status}</p>
                <span className="activity-date">Last updated: {app.lastUpdate}</span>
              </div>
            </div>
          ))}
          {userData.empowermentRequests.map(req => (
            <div key={req.id} className="activity-item">
              {getStatusIcon(req.status)}
              <div className="activity-content">
                <p><strong>Empowerment Request</strong> - {req.status}</p>
                <span className="activity-date">Last updated: {req.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="applications-section">
      <h2>My Applications & Requests</h2>
      
      <div className="applications-grid">
        <div className="application-category">
          <h3>Ambassador Applications</h3>
          {userData.applications.map(app => (
            <div key={app.id} className="application-card">
              <div className="application-header">
                <div className="application-title">
                  <h4>Ambassador Application #{app.id}</h4>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                </div>
              </div>
              <div className="application-details">
                <p><strong>Submitted:</strong> {app.submittedDate}</p>
                <p><strong>Last Update:</strong> {app.lastUpdate}</p>
                <p><strong>Country:</strong> {app.details.country}</p>
              </div>
              <div className="application-actions">
                <button className="btn btn-outline">
                  <FaEye /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="application-category">
          <h3>Empowerment Requests</h3>
          {userData.empowermentRequests.map(req => (
            <div key={req.id} className="application-card">
              <div className="application-header">
                <div className="application-title">
                  <h4>Empowerment Request #{req.id}</h4>
                  <span className={`status-badge ${getStatusClass(req.status)}`}>
                    {getStatusIcon(req.status)}
                    {req.status}
                  </span>
                </div>
              </div>
              <div className="application-details">
                <p><strong>Submitted:</strong> {req.submittedDate}</p>
                <p><strong>Last Update:</strong> {req.lastUpdate}</p>
                <p><strong>Support Type:</strong> {req.details.supportNeeded}</p>
              </div>
              <div className="application-actions">
                <button className="btn btn-outline">
                  <FaEye /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="messages-section">
      <h2>Messages</h2>
      <div className="messages-list">
        {userData.messages.map(message => (
          <div key={message.id} className={`message-card ${!message.read ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-from">
                <strong>{message.from}</strong>
                {!message.read && <FaBell className="unread-icon" />}
              </div>
              <span className="message-date">{message.date}</span>
            </div>
            <h4 className="message-subject">{message.subject}</h4>
            <p className="message-content">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <h3>{userData.profile.name}</h3>
            <p>{userData.profile.email}</p>
            <span className="join-date">Member since {userData.profile.joinDate}</span>
          </div>
          <button className="btn btn-outline">
            <FaEdit /> Edit Profile
          </button>
        </div>
        
        <div className="profile-details">
          <div className="detail-row">
            <label>Age:</label>
            <span>{userData.profile.age}</span>
          </div>
          <div className="detail-row">
            <label>Location:</label>
            <span>{userData.profile.location}</span>
          </div>
          <div className="detail-row">
            <label>Email:</label>
            <span>{userData.profile.email}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'applications':
        return renderApplications();
      case 'messages':
        return renderMessages();
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };

  if (!isLoggedIn) {
    return renderLoginForm();
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
                {item.id === 'messages' && userData.messages.filter(m => !m.read).length > 0 && (
                  <span className="notification-badge">
                    {userData.messages.filter(m => !m.read).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="dashboard-main">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
