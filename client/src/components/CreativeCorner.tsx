import { motion } from 'framer-motion';
import '../styles/creative-corner.css';

const CreativeCorner = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="creative-corner">
      <motion.div 
        className="creative-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>Creative <span className="highlight">Corner</span></h1>
        <p className="subtitle">Beyond the code - exploring life, books, coffee, and creativity</p>
      </motion.div>

      <div className="creative-content">
        {/* 书架区域 */}
        <motion.div 
          className="creative-section bookshelf-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>📚 My Bookshelf</h2>
          <p className="section-intro">Books that shaped my thinking and inspired my journey.</p>
          
          <div className="books-grid">
            <div className="book-item">
              <div className="book-cover">
                <img src="/book-cover/software_engineers-guidebook.jpg" alt="Book cover" />
              </div>
              <div className="book-info">
                <h3>The Software Engineer's Guidebook</h3>
                <p className="author">Gergely Orosz</p>
                <p className="book-note">Navigating senior, tech lead, and staff engineer positions at tech companies and startups</p>
              </div>
            </div>
            
            <div className="book-item">
              <div className="book-cover">
                <img src="/book-cover/trillion_dollar_coach.jpg" alt="Book cover" />
              </div>
              <div className="book-info">
                <h3>Trillion Dollar Coach: The Leadership Playbook of Silicon Valley's Bill</h3>
                <p className="author">Eric Schmidt, Jonathan Rosenberg, Alan Eagle</p>
                <p className="book-note">Bill Campbell played an instrumental role in the growth of several prominent companies, such as Google, Apple, and Intuit, fostering deep relationships with Silicon Valley visionaries, including Steve Jobs, Larry Page, and Eric Schmidt</p>
              </div>
            </div>
            
            <div className="book-item">
              <div className="book-cover">
                <img src="/book-cover/the_world_i_see.jpg" alt="Book cover" />
              </div>
              <div className="book-info">
                <h3>The Worlds I See</h3>
                <p className="author">Dr. Fei-Fei Li</p>
                <p className="book-note">Curiosity, Exploration, and Discovery at the Dawn of AI</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 咖啡角落 */}
        <motion.div 
          className="creative-section coffee-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>☕ Coffee Corner</h2>
          <p className="section-intro">I drank over 1000 cups of coffee in San Franciosco.</p>
          
          <div className="coffee-grid">
            <div className="coffee-item">
              <div className="coffee-image">
                <img src="/coffee/expresso.jpg" alt="Coffee" />
              </div>
              <div className="coffee-info">
                <h3>Expresso</h3>
                <p className="location">Pure shot</p>
                <p className="coffee-note">I like it with sparkling water.</p>
              </div>
            </div>
            
            <div className="coffee-item">
              <div className="coffee-image">
                <img src="/coffee/capp.jpg" alt="Coffee" />
              </div>
              <div className="coffee-info">
                <h3>Cappuccino</h3>
                <p className="location">Low Fat Milk</p>
                <p className="coffee-note">Amazing espresso blends + Oat milk/2% milk.</p>
              </div>
            </div>
            
            <div className="coffee-item">
              <div className="coffee-image">
                <img src="/coffee/cbrew.jpg" alt="Coffee" />
              </div>
              <div className="coffee-info">
                <h3>Cold Brew</h3>
                <p className="location">Brew coffee</p>
                <p className="coffee-note">Unique blends and personalized taste is my productivity fuel.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 心得分享 */}
        <motion.div 
          className="creative-section thoughts-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>My PlayList</h2>
          <p className="section-intro">I listen to R&B music recently.</p>
          
          <div className="thoughts-grid">
            <div className="thought-item">
              <iframe src="https://open.spotify.com/embed/album/1otOJAtgvO5VCBL4Gykrrd?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              {/* <h3>On Work-Life Balance</h3>
              <p className="thought-date">December 2024</p>
              <p className="thought-content">
                Living in the Bay Area taught me that success isn't just about coding 24/7. 
                Some of my best solutions come during surf sessions at Ocean Beach or hiking in Marin.
              </p> */}
            </div>
            
            <div className="thought-item">
              <iframe src="https://open.spotify.com/embed/track/1uvyZBs4IZYRebHIB1747m?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              {/* <h3>The Art of Debugging</h3>
              <p className="thought-date">November 2024</p>
              <p className="thought-content">
                Debugging is like detective work. The bug is never where you think it is, 
                and the solution is often simpler than you imagine. Patience is key.
              </p> */}
            </div>
          </div>
          
          <p className="section-intro">Here are the podcasts I listen to when I drive.</p>
          
          <div className="thoughts-grid">
            
            <div className="thought-item">
              <iframe src="https://open.spotify.com/embed/episode/2Z8zgN7UHHAB0ET5xF8UpG/video?utm_source=generator" width="496" height="279" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              {/* <h3>Learning in Public</h3>
              <p className="thought-date">October 2024</p>
              <p className="thought-content">
                Sharing your learning journey, even the failures, creates connections and opportunities. 
                The tech community is incredibly supportive when you're genuine about your growth.
              </p> */}
            </div>

            <div className="thought-item">
              <iframe src="https://open.spotify.com/embed/show/0hDOOflMW9WIQ0EONEcJsU?utm_source=generator" width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              {/* <h3>The Art of Debugging</h3>
              <p className="thought-date">November 2024</p>
              <p className="thought-content">
                Debugging is like detective work. The bug is never where you think it is, 
                and the solution is often simpler than you imagine. Patience is key.
              </p> */}
            </div>

          </div>
          
        </motion.div>
      </div>
    </div>
  );
};

export default CreativeCorner;
