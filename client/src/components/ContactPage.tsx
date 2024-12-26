import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm } from '../services/api';
import '../styles/contact-page.css';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await submitContactForm(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });
      // 清空表单
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Get in Touch</h1>
      
    <div className="social-links">
        <motion.a
            href="https://www.linkedin.com/in/taylorzhu"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="social-button-content">
            <img 
                src="/public/logo/linkedin-icon.jpg" 
                alt="LinkedIn"
                className="social-icon"
            />
            <span>LinkedIn</span>
            </div>
        </motion.a>
        
        <motion.a
            href="https://github.com/lllyt8"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="social-button-content">
            <img 
                src="/public/logo/github-icon.png" 
                alt="GitHub"
                className="social-icon"
            />
            <span>GitHub</span>
            </div>
        </motion.a>
        
        <motion.a
            href="https://taylorzhu-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="social-button-content">
            <img 
                src="/public/profile_pic.jpg" 
                alt="Blog"
                className="social-icon"
            />
            <span>Blog</span>
            </div>
        </motion.a>
    </div>

      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="What would you like to say?"
              disabled={isSubmitting}
            />
          </div>

          {submitStatus.message && (
            <motion.div 
              className={`submit-status ${submitStatus.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {submitStatus.message}
            </motion.div>
          )}
          
          <motion.button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
