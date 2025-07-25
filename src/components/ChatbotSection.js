import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaUser, FaMicrophone, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import './ChatbotSection.css';

const ChatbotSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the FFGA AI Assistant. I can help you learn about our programs, application process, mission, and how to get involved. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What is FFGA's mission?",
    "How do I become an ambassador?",
    "What programs do you offer?",
    "How can I apply for empowerment?",
    "What are the requirements?",
    "Tell me about your impact"
  ];

  // Comprehensive FFGA Knowledge Base
  const ffgaKnowledgeBase = {
    // Mission and Vision
    "mission": "FFGA's mission is to empower the next generation of leaders through education, mentorship, and community engagement. We focus on developing young ambassadors who can create lasting positive change in their communities, particularly in areas of youth development, leadership training, and social impact.",
    
    "vision": "Our vision is to create a world where every young person has the opportunity to develop their leadership potential and make a meaningful impact in their community. We envision a network of empowered youth leaders across Africa and beyond.",
    
    "purpose": "FFGA exists to bridge the gap between potential and opportunity for young people. We provide the tools, training, and support needed for youth to become effective leaders and change-makers in their communities.",

    // Programs and Services
    "programs": "FFGA offers several key programs:\n\n🎯 **Ambassador Program**: Leadership development and community impact training\n📚 **Youth Leadership Development**: Skills training and mentorship\n🤝 **Community Impact Projects**: Real-world application of leadership skills\n💪 **Empowerment Initiative**: Support for individuals facing challenges\n🎓 **Mentorship Program**: One-on-one guidance from experienced leaders\n📞 **Communication Hub**: Virtual meetings, video calls, and AI assistance",

    "ambassador program": "Our Ambassador Program is designed to develop young leaders who can make a significant impact in their communities. Ambassadors receive comprehensive training in leadership, communication, project management, and community engagement. They participate in real projects, receive mentorship, and become part of our global network of change-makers.",

    "empowerment": "Our Empowerment Initiative provides support to individuals facing various challenges in their communities. Whether you need help starting a project, accessing resources, or overcoming obstacles, we connect you with mentors, funding opportunities, and practical solutions. We believe everyone deserves the chance to succeed.",

    // Application Process
    "how to apply": "There are two main ways to get involved with FFGA:\n\n**Ambassador Application:**\n1. Fill out the application form on our website\n2. Provide your motivation and background\n3. Complete email verification\n4. Participate in an interview process\n5. Complete training program\n\n**Empowerment Request:**\n1. Submit your request through our Empowerment section\n2. Describe your challenge and goals\n3. Specify what support you need\n4. Complete verification process\n5. Get matched with appropriate resources",

    "requirements": "**Ambassador Requirements:**\n• Age 16-35 years\n• Passion for community development\n• Basic communication skills\n• Commitment to complete training\n• Willingness to lead projects\n\n**Empowerment - No strict requirements:**\n• Genuine need for support\n• Clear description of your challenge\n• Willingness to work towards solutions\n• Open to mentorship and guidance",

    "application process": "Our application process includes email verification for security. After submitting your application, you'll receive a 6-digit verification code via email. Enter this code to complete your application. This ensures we can reach you and prevents spam applications.",

    // Impact and Results
    "impact": "FFGA has made significant impact across communities:\n\n📊 **Key Statistics:**\n• 2,156+ youth reached through our programs\n• 89 active ambassadors worldwide\n• 34 completed community projects\n• 1,247+ total users in our network\n• 75% application approval rate\n\n🌍 **Global Reach:**\nWe work primarily in African countries including Nigeria, Ghana, Kenya, and expanding to other regions.",

    "success stories": "Our ambassadors have launched successful initiatives including youth mentorship programs, educational resource centers, skills training workshops, and community development projects. Many have gone on to become leaders in their fields and continue making positive impact.",

    // Getting Involved
    "get involved": "There are many ways to get involved with FFGA:\n\n🎯 **Become an Ambassador**: Lead community projects and develop your leadership skills\n💪 **Request Empowerment**: Get support for your challenges and goals\n🤝 **Volunteer**: Help with events and community projects\n📢 **Spread Awareness**: Share our mission with others\n💬 **Join Discussions**: Participate in our communication hub\n🎓 **Attend Events**: Join our workshops and training sessions",

    "volunteer": "Volunteers are essential to our mission! You can help with event organization, mentoring new members, content creation, community outreach, and project support. Contact us through the website to learn about current volunteer opportunities.",

    // Communication and Support
    "contact": "You can reach FFGA through:\n• Website contact form\n• Communication Hub for meetings and discussions\n• User Dashboard for application tracking\n• This AI Assistant for immediate help\n• Social media channels\n• Email support for specific inquiries",

    "support": "We provide comprehensive support including:\n• 24/7 AI Assistant (that's me!)\n• Mentorship matching\n• Resource access\n• Training materials\n• Community network\n• Technical assistance\n• Project funding guidance",

    // Technology and Platform
    "dashboard": "Our platform includes:\n• **User Dashboard**: Track your applications and progress\n• **Admin Dashboard**: For program management\n• **Communication Hub**: Virtual meetings and discussions\n• **AI Assistant**: Instant help and information\n• **Application System**: Streamlined application process with email verification",

    "features": "Platform features include:\n✅ Secure email verification\n✅ Real-time application tracking\n✅ Interactive communication tools\n✅ Resource library access\n✅ Mentorship matching\n✅ Progress monitoring\n✅ Community networking\n✅ Mobile-responsive design"
  };

  // Enhanced response matching
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Direct keyword matching
    for (const [key, response] of Object.entries(ffgaKnowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Pattern matching for common questions
    if (lowerMessage.includes('what is') && (lowerMessage.includes('ffga') || lowerMessage.includes('organization'))) {
      return ffgaKnowledgeBase.mission;
    }
    
    if (lowerMessage.includes('how') && lowerMessage.includes('join')) {
      return ffgaKnowledgeBase["how to apply"];
    }
    
    if (lowerMessage.includes('what') && lowerMessage.includes('do')) {
      return ffgaKnowledgeBase.programs;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return ffgaKnowledgeBase.support;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return ffgaKnowledgeBase.contact;
    }
    
    if (lowerMessage.includes('requirement') || lowerMessage.includes('qualify')) {
      return ffgaKnowledgeBase.requirements;
    }
    
    if (lowerMessage.includes('impact') || lowerMessage.includes('result') || lowerMessage.includes('achievement')) {
      return ffgaKnowledgeBase.impact;
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to FFGA. I'm here to help you learn about our programs and how you can get involved. What would you like to know?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about FFGA?";
    }

    // Default response with suggestions
    return "I'd be happy to help you learn about FFGA! Here are some topics I can assist with:\n\n• Our mission and programs\n• How to become an ambassador\n• Empowerment opportunities\n• Application process\n• Requirements and qualifications\n• Our impact and success stories\n• How to get involved\n\nWhat specific information would you like to know?";
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

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm the FFGA AI Assistant. I can help you learn about our programs, application process, mission, and how to get involved. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="chatbot-section">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar">
            <FaRobot className="bot-icon" />
          </div>
          <div className="header-text">
            <h3>FFGA AI Assistant</h3>
            <p className="bot-status">
              <span className="status-dot"></span>
              Online - Ready to help
            </p>
          </div>
        </div>
        <div className="chat-controls">
          <button className="control-btn" onClick={clearChat} title="Clear Chat">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="quick-questions">
        <p>Quick questions to get started:</p>
        <div className="questions-grid">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(question)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaQuestionCircle className="question-icon" />
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-avatar">
                  {message.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, index) => (
                      <div key={index}>
                        {line}
                        {index < message.text.split('\n').length - 1 && <br />}
                      </div>
                    ))}
                  </div>
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
          <div className="input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about FFGA..."
              className="chat-input"
              rows="1"
            />
            <button
              onClick={() => handleSendMessage()}
              className="send-button"
              disabled={!inputMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
          <div className="input-help">
            <small>Press Enter to send • Shift+Enter for new line</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSection;
