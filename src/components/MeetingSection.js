import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaClock, FaUsers, FaVideo, FaTrash, FaEdit } from 'react-icons/fa';
import './MeetingSection.css';

const MeetingSection = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Youth Leadership Workshop',
      date: '2025-07-26',
      time: '14:00',
      participants: 25,
      type: 'workshop',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Ambassador Training Session',
      date: '2025-07-27',
      time: '10:00',
      participants: 15,
      type: 'training',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Community Impact Discussion',
      date: '2025-07-25',
      time: '16:00',
      participants: 12,
      type: 'discussion',
      status: 'ongoing'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    type: 'workshop',
    description: ''
  });

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    const meeting = {
      id: Date.now(),
      ...newMeeting,
      participants: 0,
      status: 'scheduled'
    };
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', date: '', time: '', type: 'workshop', description: '' });
    setShowCreateForm(false);
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return '#4CAF50';
      case 'scheduled': return '#2196F3';
      case 'completed': return '#9E9E9E';
      default: return '#2196F3';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'workshop': return '🎓';
      case 'training': return '📚';
      case 'discussion': return '💬';
      default: return '📅';
    }
  };

  return (
    <div className="meeting-section">
      <div className="meeting-header">
        <h2>Meeting Management</h2>
        <button 
          className="create-meeting-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <FaCalendarPlus /> Schedule Meeting
        </button>
      </div>

      {showCreateForm && (
        <motion.div 
          className="create-meeting-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="modal-content">
            <h3>Schedule New Meeting</h3>
            <form onSubmit={handleCreateMeeting}>
              <div className="form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Meeting Type</label>
                <select
                  value={newMeeting.type}
                  onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                >
                  <option value="workshop">Workshop</option>
                  <option value="training">Training</option>
                  <option value="discussion">Discussion</option>
                  <option value="presentation">Presentation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit">Schedule Meeting</button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="meetings-grid">
        {meetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            className="meeting-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="meeting-header-card">
              <div className="meeting-type">
                <span className="type-icon">{getTypeIcon(meeting.type)}</span>
                <span className="type-text">{meeting.type}</span>
              </div>
              <div 
                className="meeting-status"
                style={{ backgroundColor: getStatusColor(meeting.status) }}
              >
                {meeting.status}
              </div>
            </div>
            
            <h3 className="meeting-title">{meeting.title}</h3>
            
            <div className="meeting-details">
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <span>{meeting.date} at {meeting.time}</span>
              </div>
              <div className="detail-item">
                <FaUsers className="detail-icon" />
                <span>{meeting.participants} participants</span>
              </div>
            </div>
            
            <div className="meeting-actions">
              {meeting.status === 'scheduled' && (
                <button className="action-btn join-btn">
                  <FaVideo /> Join Meeting
                </button>
              )}
              {meeting.status === 'ongoing' && (
                <button className="action-btn ongoing-btn">
                  <FaVideo /> Meeting in Progress
                </button>
              )}
              <button className="action-btn edit-btn">
                <FaEdit />
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => deleteMeeting(meeting.id)}
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {meetings.length === 0 && (
        <div className="empty-state">
          <h3>No meetings scheduled</h3>
          <p>Create your first meeting to get started!</p>
        </div>
      )}
    </div>
  );
};

export default MeetingSection;
