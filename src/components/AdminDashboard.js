import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaComments, FaEye, FaCog, 
  FaUserGraduate, FaHandsHelping, FaCheck, FaTimes, FaClock,
  FaChartLine, FaDownload, FaSearch, FaBell, FaEnvelope
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for applications
  const [ambassadorApplications, setAmbassadorApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      country: 'Nigeria',
      motivation: 'I want to help youth in my community develop leadership skills...',
      status: 'pending',
      submittedAt: '2025-01-20T10:30:00Z',
      verificationCode: '123456'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      country: 'Ghana',
      motivation: 'Passionate about empowering young women in STEM...',
      status: 'approved',
      submittedAt: '2025-01-19T14:20:00Z',
      verificationCode: '789012'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@example.com',
      country: 'Kenya',
      motivation: 'I believe in creating opportunities for underprivileged youth...',
      status: 'rejected',
      submittedAt: '2025-01-18T09:15:00Z',
      verificationCode: '345678'
    }
  ]);

  const [empowermentRequests, setEmpowermentRequests] = useState([
    {
      id: 1,
      name: 'Grace Okafor',
      email: 'grace@example.com',
      phone: '+234-123-456-789',
      problem: 'Need support to start a youth mentorship program in my community',
      motivation: 'I want to help young people develop skills and find opportunities',
      supportNeeded: 'Funding, mentorship, training materials',
      status: 'pending',
      submittedAt: '2025-01-21T11:45:00Z'
    },
    {
      id: 2,
      name: 'David Mensah',
      email: 'david@example.com',
      phone: '+233-987-654-321',
      problem: 'Lack of educational resources in rural areas',
      motivation: 'Education is the key to breaking the cycle of poverty',
      supportNeeded: 'Educational materials, volunteer teachers',
      status: 'approved',
      submittedAt: '2025-01-20T16:30:00Z'
    }
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 10);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: FaUsers, title: 'Active Users', value: activeUsers, color: '#4CAF50' },
    { icon: FaUserGraduate, title: 'Ambassador Applications', value: ambassadorApplications.length, color: '#2196F3' },
    { icon: FaHandsHelping, title: 'Empowerment Requests', value: empowermentRequests.length, color: '#FF9800' },
    { icon: FaComments, title: 'Messages Today', value: 156, color: '#9C27B0' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaEye },
    { id: 'ambassadors', label: 'Ambassador Applications', icon: FaUserGraduate },
    { id: 'empowerment', label: 'Empowerment Requests', icon: FaHandsHelping },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'communications', label: 'Communications', icon: FaComments },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const handleApplicationAction = (id, action, type) => {
    if (type === 'ambassador') {
      setAmbassadorApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: action } : app
        )
      );
    } else {
      setEmpowermentRequests(prev => 
        prev.map(req => 
          req.id === id ? { ...req, status: action } : req
        )
      );
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#FF9800', icon: FaClock, text: 'Pending' },
      approved: { color: '#4CAF50', icon: FaCheck, text: 'Approved' },
      rejected: { color: '#F44336', icon: FaTimes, text: 'Rejected' }
    };
    
    const config = statusConfig[status];
    return (
      <span className="status-badge" style={{ backgroundColor: config.color }}>
        <config.icon className="status-icon" />
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            
            <div className="dashboard-grid">
              <div className="activity-feed">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-time">2 min ago</span>
                    <span className="activity-text">New ambassador application from John Doe</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">5 min ago</span>
                    <span className="activity-text">Empowerment request approved for David Mensah</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">8 min ago</span>
                    <span className="activity-text">New user registered: Sarah Johnson</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-time">12 min ago</span>
                    <span className="activity-text">Meeting "Youth Leadership" completed</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn" onClick={() => setSelectedSection('ambassadors')}>
                    <FaUserGraduate />
                    Review Applications
                  </button>
                  <button className="action-btn" onClick={() => setSelectedSection('empowerment')}>
                    <FaHandsHelping />
                    Empowerment Requests
                  </button>
                  <button className="action-btn" onClick={() => setSelectedSection('analytics')}>
                    <FaChartLine />
                    View Analytics
                  </button>
                  <button className="action-btn">
                    <FaEnvelope />
                    Send Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ambassadors':
        return (
          <div className="admin-section">
            <div className="section-header">
              <h2>Ambassador Applications</h2>
              <div className="section-controls">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="filter-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="export-btn">
                  <FaDownload />
                  Export
                </button>
              </div>
            </div>

            <div className="applications-grid">
              {ambassadorApplications
                .filter(app => 
                  (filterStatus === 'all' || app.status === filterStatus) &&
                  (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   app.country.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map(application => (
                  <motion.div
                    key={application.id}
                    className="application-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="application-header">
                      <div className="applicant-info">
                        <h4>{application.name}</h4>
                        <p>{application.email}</p>
                        <span className="country-tag">{application.country}</span>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    
                    <div className="application-content">
                      <div className="motivation-preview">
                        <strong>Motivation:</strong>
                        <p>{application.motivation.substring(0, 100)}...</p>
                      </div>
                      <div className="application-meta">
                        <span>Submitted: {formatDate(application.submittedAt)}</span>
                        <span>Code: {application.verificationCode}</span>
                      </div>
                    </div>

                    {application.status === 'pending' && (
                      <div className="application-actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleApplicationAction(application.id, 'approved', 'ambassador')}
                        >
                          <FaCheck /> Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleApplicationAction(application.id, 'rejected', 'ambassador')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        );

      case 'empowerment':
        return (
          <div className="admin-section">
            <div className="section-header">
              <h2>Empowerment Requests</h2>
              <div className="section-controls">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="filter-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="requests-grid">
              {empowermentRequests
                .filter(req => 
                  (filterStatus === 'all' || req.status === filterStatus) &&
                  (req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   req.problem.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map(request => (
                  <motion.div
                    key={request.id}
                    className="request-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="request-header">
                      <div className="requester-info">
                        <h4>{request.name}</h4>
                        <p>{request.email}</p>
                        <p>{request.phone}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="request-content">
                      <div className="problem-description">
                        <strong>Problem:</strong>
                        <p>{request.problem}</p>
                      </div>
                      <div className="motivation-description">
                        <strong>Motivation:</strong>
                        <p>{request.motivation}</p>
                      </div>
                      <div className="support-needed">
                        <strong>Support Needed:</strong>
                        <p>{request.supportNeeded}</p>
                      </div>
                      <div className="request-meta">
                        <span>Submitted: {formatDate(request.submittedAt)}</span>
                      </div>
                    </div>

                    {request.status === 'pending' && (
                      <div className="request-actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleApplicationAction(request.id, 'approved', 'empowerment')}
                        >
                          <FaCheck /> Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleApplicationAction(request.id, 'rejected', 'empowerment')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="admin-section">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
              <div className="chart-container">
                <h3>Application Trends</h3>
                <div className="chart-placeholder">
                  <FaChartLine className="chart-icon" />
                  <p>Ambassador applications: 15 this month</p>
                  <p>Empowerment requests: 8 this month</p>
                  <p>Approval rate: 75%</p>
                </div>
              </div>
              <div className="metrics-container">
                <h3>Key Metrics</h3>
                <div className="metrics-list">
                  <div className="metric-item">
                    <span>Total Users</span>
                    <span>1,247</span>
                  </div>
                  <div className="metric-item">
                    <span>Active Ambassadors</span>
                    <span>89</span>
                  </div>
                  <div className="metric-item">
                    <span>Completed Projects</span>
                    <span>34</span>
                  </div>
                  <div className="metric-item">
                    <span>Community Impact</span>
                    <span>2,156 youth reached</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="admin-section">
            <h2>User Management</h2>
            <div className="user-management-content">
              <div className="user-stats">
                <div className="user-stat-card">
                  <h4>Total Users</h4>
                  <p>1,247</p>
                </div>
                <div className="user-stat-card">
                  <h4>Active This Month</h4>
                  <p>892</p>
                </div>
                <div className="user-stat-card">
                  <h4>New This Week</h4>
                  <p>23</p>
                </div>
              </div>
              <div className="user-actions">
                <button className="admin-action-btn">
                  <FaBell />
                  Send Notifications
                </button>
                <button className="admin-action-btn">
                  <FaDownload />
                  Export User Data
                </button>
                <button className="admin-action-btn">
                  <FaUsers />
                  Manage Roles
                </button>
              </div>
            </div>
          </div>
        );

      case 'communications':
        return (
          <div className="admin-section">
            <h2>Communications Center</h2>
            <div className="communications-grid">
              <div className="comm-section">
                <h3>Broadcast Messages</h3>
                <textarea 
                  placeholder="Type your message to all users..."
                  className="broadcast-textarea"
                ></textarea>
                <button className="send-broadcast-btn">
                  <FaEnvelope />
                  Send Broadcast
                </button>
              </div>
              <div className="comm-section">
                <h3>Email Templates</h3>
                <div className="template-list">
                  <div className="template-item">Welcome Email</div>
                  <div className="template-item">Application Approved</div>
                  <div className="template-item">Application Rejected</div>
                  <div className="template-item">Monthly Newsletter</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="admin-section">
            <h2>System Settings</h2>
            <div className="settings-grid">
              <div className="settings-group">
                <h3>Application Settings</h3>
                <div className="setting-item">
                  <label>Auto-approve applications</label>
                  <input type="checkbox" />
                </div>
                <div className="setting-item">
                  <label>Email verification required</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-item">
                  <label>Maximum applications per day</label>
                  <input type="number" defaultValue="50" />
                </div>
              </div>
              <div className="settings-group">
                <h3>Notification Settings</h3>
                <div className="setting-item">
                  <label>Email notifications</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-item">
                  <label>SMS notifications</label>
                  <input type="checkbox" />
                </div>
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
        <div className="header-content">
          <img src="/images/logo.jpg" alt="FFGA Logo" className="admin-logo" />
          <div className="header-text">
            <h1>FFGA Admin Dashboard</h1>
            <p>Manage applications, users, and platform content</p>
          </div>
        </div>
        <div className="admin-notifications">
          <FaBell className="notification-icon" />
          <span className="notification-badge">3</span>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-item ${selectedSection === item.id ? 'active' : ''}`}
                onClick={() => setSelectedSection(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </motion.button>
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
