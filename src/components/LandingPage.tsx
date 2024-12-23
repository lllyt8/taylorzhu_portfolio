import { motion } from 'framer-motion';
import '../styles/landing-page.css';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

const LandingPage = () => {
  return (
    <motion.div 
      className="landing-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="left-content">
        <h1>Hello I'm<br /><span className="highlight">Taylor Zhu</span></h1>
        <h2>Software Engineer & Researcher</h2>
        <p>Passionate about building high-performance, robust, and efficient software solutions.</p>
        <div className="action-buttons">
          <button className="primary-btn">Download Resume</button>
          <button className="secondary-btn">Contact Me</button>
        </div>
      </div>

      <div className="center-content">
        <div className="image-container">
          <div className="background-circle"></div>
          <img src="/public/images/landingpage.gif" alt="Taylor Zhu" />
        </div>
      </div>

      <div className="right-content">
        <div className="stats">
          <div className="stat-card">
            <h3>3+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-card">
            <h3>5+</h3>
            <p>Major Projects</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
