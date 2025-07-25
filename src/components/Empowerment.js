import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Empowerment.css';

const Empowerment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    location: '',
    problem: '',
    motivation: '',
    supportNeeded: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [verificationStep, setVerificationStep] = useState('form'); // 'form', 'verification', 'success'
  const [enteredCode, setEnteredCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Generate a 6-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async (email, code) => {
    try {
      // Send verification code to user's email
      await axios.post('https://formspree.io/f/YOUR_FORM_ID', {
        to: email,
        subject: 'FFGA Empowerment Request - Verification Code',
        message: `Your verification code is: ${code}. Please enter this code to complete your empowerment support request.`,
        _subject: 'FFGA Empowerment Verification Code'
      });
      return true;
    } catch (error) {
      console.error('Error sending verification code:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Generate verification code
      const code = generateVerificationCode();
      setGeneratedCode(code);

      // Send verification code to user's email
      const codeSent = await sendVerificationCode(formData.email, code);
      
      if (codeSent) {
        setVerificationStep('verification');
        setSubmitStatus('code-sent');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error in empowerment request process:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (enteredCode === generatedCode) {
      try {
        // Send the actual empowerment request data
        await axios.post('https://formspree.io/f/YOUR_FORM_ID', {
          name: formData.name,
          email: formData.email,
          age: formData.age,
          location: formData.location,
          problem: formData.problem,
          motivation: formData.motivation,
          supportNeeded: formData.supportNeeded,
          _subject: 'New Empowerment Support Request - VERIFIED',
          verified: true
        });

        setVerificationStep('success');
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          age: '',
          location: '',
          problem: '',
          motivation: '',
          supportNeeded: ''
        });
        setEnteredCode('');
        setGeneratedCode('');
      } catch (error) {
        console.error('Error submitting verified empowerment request:', error);
        setSubmitStatus('error');
      }
    } else {
      setSubmitStatus('invalid-code');
    }
    
    setIsSubmitting(false);
  };

  const resendCode = async () => {
    setIsSubmitting(true);
    const newCode = generateVerificationCode();
    setGeneratedCode(newCode);
    
    const codeSent = await sendVerificationCode(formData.email, newCode);
    if (codeSent) {
      setSubmitStatus('code-resent');
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const goBackToForm = () => {
    setVerificationStep('form');
    setSubmitStatus('');
    setEnteredCode('');
    setGeneratedCode('');
  };

  return (
    <section id="empowerment" className="empowerment">
      <div className="container">
        <motion.div 
          className="empowerment-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Seeking Empowerment & Support?</h2>
          <p>We're here to help you overcome challenges and unlock your potential. Share your story with us.</p>
          
          <motion.div 
            className="empowerment-form"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {verificationStep === 'form' && (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Your Age"
                      min="1"
                      max="100"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your Location (City, Country)"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="What challenges or problems are you facing? Please describe your situation..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Why do you want to join FFGA? What are your goals and aspirations?"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="supportNeeded"
                    value={formData.supportNeeded}
                    onChange={handleChange}
                    placeholder="What kind of support or empowerment do you need from us? (e.g., mentorship, resources, training, etc.)"
                    rows="3"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Verification Code...' : 'Request Support & Empowerment'}
                </button>

                {submitStatus === 'code-sent' && (
                  <div className="submit-message success">
                    <p>📧 Verification code sent to {formData.email}! Please check your email and enter the code below.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="submit-message error">
                    <p>❌ Sorry, there was an error sending the verification code. Please try again.</p>
                  </div>
                )}
              </form>
            )}

            {verificationStep === 'verification' && (
              <form onSubmit={handleVerificationSubmit} className="verification-form">
                <div className="verification-header">
                  <h3>📧 Email Verification</h3>
                  <p>We've sent a 6-digit verification code to <strong>{formData.email}</strong></p>
                  <p>Please enter the code to complete your empowerment request:</p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="Enter 6-digit verification code"
                    maxLength="6"
                    pattern="[0-9]{6}"
                    required
                    className="verification-input"
                  />
                </div>

                <div className="verification-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-full"
                    disabled={isSubmitting || enteredCode.length !== 6}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify & Complete Request'}
                  </button>

                  <div className="verification-options">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={resendCode}
                      disabled={isSubmitting}
                    >
                      Resend Code
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-link"
                      onClick={goBackToForm}
                    >
                      Back to Form
                    </button>
                  </div>
                </div>

                {submitStatus === 'code-resent' && (
                  <div className="submit-message success">
                    <p>📧 New verification code sent to your email!</p>
                  </div>
                )}

                {submitStatus === 'invalid-code' && (
                  <div className="submit-message error">
                    <p>❌ Invalid verification code. Please check your email and try again.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="submit-message error">
                    <p>❌ Sorry, there was an error processing your request. Please try again.</p>
                  </div>
                )}
              </form>
            )}

            {verificationStep === 'success' && (
              <div className="success-screen">
                <div className="success-content">
                  <h3>🎉 Empowerment Request Submitted Successfully!</h3>
                  <p>Thank you, <strong>{formData.name}</strong>! Your empowerment support request has been verified and submitted.</p>
                  <p>Our team will review your request and contact you soon to discuss how we can help empower you.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setVerificationStep('form');
                      setSubmitStatus('');
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="empowerment-info"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>How We Can Help You</h3>
            <div className="help-grid">
              <div className="help-item">
                <h4>🎓 Education & Training</h4>
                <p>Access to educational resources, skill development programs, and training opportunities.</p>
              </div>
              <div className="help-item">
                <h4>🤝 Mentorship</h4>
                <p>Connect with experienced mentors who can guide you through your challenges and goals.</p>
              </div>
              <div className="help-item">
                <h4>💼 Career Support</h4>
                <p>Job placement assistance, career counseling, and professional development opportunities.</p>
              </div>
              <div className="help-item">
                <h4>🌍 Community</h4>
                <p>Join a supportive community of like-minded individuals working towards positive change.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Empowerment;
