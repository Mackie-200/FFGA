import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaUser, FaMicrophone, FaTimes } from 'react-icons/fa';
import './ChatbotSection.css';

const ChatbotSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the FFGA Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What programs does FFGA offer?",
    "How can I become an ambassador?",
    "What are the upcoming events?",
    "How can I get involved?",
    "Tell me about FFGA's mission"
  ];

  const botResponses = {
    "what programs does ffga offer": "FFGA offers various programs including Youth Leadership Development, Community Impact Projects, Ambassador Training, and Mentorship Programs. Each program is designed to empower young leaders and create positive change in communities.",
    "how can i become an ambassador": "To become an FFGA Ambassador, you can apply through our Join section on the website. The process includes filling out an application, participating in an interview, and completing our training program. We look for passionate individuals committed to making a difference.",
    "what are the upcoming events": "We have several exciting events coming up including our Youth Leadership Workshop next week, Ambassador Training Session, and Community Impact Discussion. Check our meetings section for specific dates and times.",
    "how can i get involved": "There are many ways to get involved with FFGA! You can become an ambassador, participate in our programs, attend events, volunteer for community projects, or simply spread awareness about our mission.",
    "tell me about ffga's mission": "FFGA's mission is to empower the next generation of leaders through education, mentorship, and community engagement. We believe in creating positive change by developing young ambassadors who can make a lasting impact in their communities."
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(messageText.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Check for keywords
    if (message.includes('program') || message.includes('course')) {
      return botResponses["what programs does ffga offer"];
    }
    if (message.includes('ambassador') || message.includes('join')) {
      return botResponses["how can i become an ambassador"];
    }
    if (message.includes('event') || message.includes('meeting')) {
      return botResponses["what are the upcoming events"];
    }
    if (message.includes('involve') || message.includes('participate')) {
      return botResponses["how can i get involved"];
    }
    if (message.includes('mission') || message.includes('about')) {
      return botResponses["tell me about ffga's mission"];
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! For more specific information, please contact our team or check out our programs section.",
      "I'd be happy to help you with that! You can find more details in our About section or reach out to our ambassadors.",
      "Thanks for your question! For the most up-to-date information, I recommend checking our website sections or contacting us directly.",
      "Great question! Our team would love to provide you with detailed information. Feel free to explore our programs or get in touch."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-section">
      <div className="chatbot-header">
        <img src="/images/logo.jpg" alt="FFGA Logo" className="chatbot-logo" />
        <div>
          <h2>AI Assistant</h2>
          <p>Get instant answers to your questions about FFGA</p>
        </div>
      </div>

      <div className="chatbot-container">
        <div className="quick-questions">
          <h3>Quick Questions</h3>
          <div className="questions-grid">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                className="quick-question-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="chat-interface">
          <div className="chat-messages">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? (
                      <FaRobot />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                className="message bot typing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="chat-input">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about FFGA..."
                rows="1"
              />
              <button 
                className="voice-btn"
                title="Voice input (coming soon)"
              >
                <FaMicrophone />
              </button>
              <button 
                className="send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        className="floating-chat-btn"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Mini Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="mini-chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="mini-chat-header">
              <div className="mini-chat-info">
                <img src="/images/logo.jpg" alt="FFGA" className="mini-logo" />
                <div>
                  <h4>FFGA Assistant</h4>
                  <p>Online</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="mini-chat-messages">
              {messages.slice(-3).map((message) => (
                <div key={message.id} className={`mini-message ${message.sender}`}>
                  <div className="mini-message-text">{message.text}</div>
                </div>
              ))}
            </div>
            
            <div className="mini-chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
              />
              <button onClick={() => handleSendMessage()}>
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotSection;
