import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPhone, FaUsers, FaShare, FaCog } from 'react-icons/fa';
import './VideoCallSection.css';

const VideoCallSection = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', avatar: '/images/logo.jpg', isMuted: false },
    { id: 2, name: 'Jane Smith', avatar: '/images/logo.jpg', isMuted: true },
    { id: 3, name: 'Mike Johnson', avatar: '/images/logo.jpg', isMuted: false }
  ]);
  const [roomCode, setRoomCode] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const startCall = () => {
    setIsInCall(true);
    setRoomCode(generateRoomCode());
    // Hide page scroll and other sections
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
  };

  const endCall = () => {
    setIsInCall(false);
    setRoomCode('');
    setIsMuted(false);
    setIsVideoOff(false);
    // Restore page scroll and other sections
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.width = 'auto';
    document.body.style.height = 'auto';
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const joinRoom = (code) => {
    setRoomCode(code);
    setIsInCall(true);
    setShowJoinForm(false);
    // Hide page scroll and other sections
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (isInCall) {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        document.body.style.width = 'auto';
        document.body.style.height = 'auto';
      }
    };
  }, [isInCall]);

  if (isInCall) {
    return (
      <div className="video-call-active">
        <div className="call-header">
          <div className="call-info">
            <img src="/images/logo.jpg" alt="FFGA Logo" className="call-logo" />
            <div>
              <h3>FFGA Video Conference</h3>
              <p>Room: {roomCode}</p>
            </div>
          </div>
          <div className="participant-count">
            <FaUsers /> {participants.length + 1} participants
          </div>
        </div>

        <div className="video-grid">
          <div className="main-video">
            <div className="video-placeholder">
              {isVideoOff ? (
                <div className="video-off">
                  <FaVideoSlash />
                  <p>Camera is off</p>
                </div>
              ) : (
                <div className="video-feed">
                  <div className="user-avatar">
                    <img src="/images/logo.jpg" alt="You" />
                  </div>
                  <span className="user-name">You</span>
                </div>
              )}
            </div>
          </div>

          <div className="participants-grid">
            {participants.map((participant) => (
              <motion.div
                key={participant.id}
                className="participant-video"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="video-feed">
                  <img src={participant.avatar} alt={participant.name} />
                  <span className="user-name">{participant.name}</span>
                  {participant.isMuted && <FaMicrophoneSlash className="muted-icon" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="call-controls">
          <button
            className={`control-btn ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
          >
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          
          <button
            className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
            onClick={toggleVideo}
          >
            {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
          </button>
          
          <button className="control-btn share-btn">
            <FaShare />
          </button>
          
          <button className="control-btn settings-btn">
            <FaCog />
          </button>
          
          <button className="control-btn end-call-btn" onClick={endCall}>
            <FaPhone />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-call-section">
      <div className="video-header">
        <img src="/images/logo.jpg" alt="FFGA Logo" className="section-logo" />
        <div>
          <h2>Video Conferences</h2>
          <p>Connect with ambassadors and community members</p>
        </div>
      </div>

      <div className="call-options">
        <motion.div
          className="call-option-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaVideo className="option-icon" />
          <h3>Start New Meeting</h3>
          <p>Begin an instant video conference</p>
          <button className="option-btn start-btn" onClick={startCall}>
            Start Meeting
          </button>
        </motion.div>

        <motion.div
          className="call-option-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUsers className="option-icon" />
          <h3>Join Meeting</h3>
          <p>Enter a meeting room code</p>
          <button 
            className="option-btn join-btn"
            onClick={() => setShowJoinForm(true)}
          >
            Join Meeting
          </button>
        </motion.div>
      </div>

      {showJoinForm && (
        <motion.div
          className="join-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="modal-content">
            <h3>Join Meeting</h3>
            <input
              type="text"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength="6"
            />
            <div className="modal-actions">
              <button onClick={() => setShowJoinForm(false)}>Cancel</button>
              <button 
                onClick={() => joinRoom(roomCode)}
                disabled={roomCode.length !== 6}
              >
                Join
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="recent-meetings">
        <h3>Recent Meetings</h3>
        <div className="meetings-list">
          <div className="meeting-item">
            <div className="meeting-info">
              <h4>Youth Leadership Workshop</h4>
              <p>Yesterday, 2:00 PM • 45 minutes</p>
            </div>
            <button className="rejoin-btn">View Recording</button>
          </div>
          <div className="meeting-item">
            <div className="meeting-info">
              <h4>Ambassador Training</h4>
              <p>2 days ago, 10:00 AM • 1 hour 20 minutes</p>
            </div>
            <button className="rejoin-btn">View Recording</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallSection;
