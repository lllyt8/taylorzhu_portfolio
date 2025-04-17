import { motion } from 'framer-motion';
import { PageType } from '../types/navigation';
import ResponsiveImage from './common/ResponsiveImage';
import '../styles/landing-page.css';

interface LandingPageProps {
  onOpenChat: () => void;
  onNavigate: (page: PageType) => void;
}

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

const LandingPage = ({ onOpenChat, onNavigate }: LandingPageProps) => {
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
          <button
            type="button"
            className="primary-btn"
            onClick={() => onNavigate('about')}
          >
            About Me
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onNavigate('contact')}
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="center-content">
        <div className="image-container">
          {/* <div className="background-circle"></div> */}
          <ResponsiveImage
            src="/profile_pic.jpg"
            alt="Taylor Zhu"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
          <motion.button
            type="button"
            className="chat-bubble"
            onClick={onOpenChat}
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Chat with me ✨
          </motion.button>
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
