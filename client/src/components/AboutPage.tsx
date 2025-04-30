import { motion } from 'framer-motion';
import FloatingNav from './FloatingNav';
import '../styles/about-page.css';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about-page">
      <FloatingNav />
      <motion.div 
        className="about-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>About <span className="highlight">Me</span></h1>
        <p className="subtitle">Software Engineer & Researcher @ San Francisco Bay Area</p>
      </motion.div>

      <div className="about-content">
        <motion.div 
          id="education"
          className="about-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date"></div>
              <div className="timeline-content">
                <h3>Doctor of Philosophy in Computer Science & Engineering</h3>
                <p>Santa Clara University, CA</p>
                <div className="company-logo">
                  <img src="/santa-clara-university-logo.png" alt="Santa Clara University logo" />
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date"></div>
              <div className="timeline-content">
                <h3>Master of Engineering in Computer Science & Engineering</h3>
                <p>Santa Clara University, CA</p>
                <div className="company-logo">
                  <img src="/santa-clara-university-logo.png" alt="Santa Clara University logo" />
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date"></div>
              <div className="timeline-content">
                <h3>Bachelor of Engineering in Computer Science & Engineering</h3>
                <p>South China University of Technology, China</p>
                <div className="company-logo">
                  <img src="/SCUT.png" alt="SCUT logo" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          id="skills"
          className="about-section skills-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Technical Expertise</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <ul>
                <li>Python</li>
                <li>TypeScript</li>
                <li>Java</li>
                <li>Go</li>
                <li>C/C++</li>
                <li>Rust</li>
                <li>Kotlin</li>
                <li>JavaScript</li>
                <li>SQL</li>
                <li>HTML/CSS</li>
                <li>Ruby</li>
                <li>PHP</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Web</h3>
              <ul>
                <li>Django, Flask, FastAPI</li>
                <li>Spring Boot</li>
                <li>Ruby on Rail</li>
                <li>Express, Node.js, Next.js</li>
                <li>React, Vue, Angular</li>               
                <li>RESTful APIs</li>
                <li>gRPC</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Cloud & Databases & DevOps</h3>
              <ul>
                <li>PostgreSQL, MySQL</li>
                <li>MongoDB, Cassandra</li>
                <li>Redis, Kafka, RabbitMQ</li>
                <li>Spark, Hive</li>
                <li>Docker, K8s, Jenkins, Git/GitHub Action, CI/CD, Nginx, Linux</li>
                <li>AWS, Google Cloud Platform, Azure</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          id="experience"
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Work Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2023 - 2024</div>
              <div className="timeline-content">
                <h3>PhD Research Assistant</h3>
                <p>Santa Clara University, School of Engineering</p>
                <ul>
                  <li>Developed a distributed network protection framework in Python</li>
                  <li>Built a distributed computation framework using NetworkX and Scipy</li>
                  <li>Optimized data processing achieving 70% improvement in speed</li>
                  <li>Built custom monitoring tools using asyncio and aiohttp</li>
                </ul>
                <div className="company-logo">
                  <img src="/santa-clara-university-logo.png" alt="Santa Clara University logo" />
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2022 - 2023</div>
              <div className="timeline-content">
                <h3>Full Stack Engineer</h3>
                <p>Kellynkai, San Francisco</p>
                <ul>
                  <li>Developed real-time interaction system using TypeScript and React</li>
                  <li>Implemented efficient GraphQL API with schema optimization</li>
                  <li>Leveraged WebSocket for real-time synchronization</li>
                  <li>Collaborated with product manager and cross-functional teams</li>
                </ul>
                <div className="company-logo">
                  <img src="/kellynkai_logo.png" alt="Kellynkai logo" />
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2020 - 2021</div>
              <div className="timeline-content">
                <h3>Software Engineer</h3>
                <p>Huawei, Shenzhen</p>
                <ul>
                  <li>Developed system integration for microservices-based platform</li>
                  <li>Led service optimizations achieving 30% latency improvement</li>
                  <li>Engineered high-performance ETL pipelines</li>
                  <li>Implemented real-time data streaming with WebSocket</li>
                </ul>
                <div className="company-logo">
                  <img src="/Huawei_logo.png" alt="Huawei logo" />
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2019 - 2020</div>
              <div className="timeline-content">
                <h3>Software Engineer</h3>
                <p>Tencent, Shenzhen</p>
                <ul>
                  <li>Collaborated in developing file management module</li>
                  <li>Implemented robust file upload system reducing upload time by 80%</li>
                  <li>Optimized database access patterns using Redis caching</li>
                  <li>Designed and maintained CI/CD pipelines</li>
                </ul>
                <div className="company-logo">
                  <img src="/tencent_logo.png" alt="Tencent logo" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          id="projects"
          className="about-section projects-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Latest Project</h2>
          <div className="project-card">
            <h3>San Francisco Middle School Lunch Delivery System</h3>
            <p className="project-duration">Oct 2024 - Jan 2025</p>
            <ul>
              <li>Built a high-throughput lunch order management system serving 1000+ students</li>
              <li>Engineered scalable backend services using Node.js and Express</li>
              <li>Designed distributed search system using Elasticsearch</li>
              <li>Implemented real-time order status updates using WebSocket</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          id="interests"
          className="about-section interests-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2>Beyond Tech</h2>
          <div className="interests-grid">
            <div className="interest-item">
              <h3>🏄‍♂️ Surfing</h3>
              <p>Catching waves at Ocean Beach</p>
            </div>
            <div className="interest-item">
              <h3>🥾 Hiking</h3>
              <p>Exploring Bay Area trails</p>
            </div>
            <div className="interest-item">
              <h3>☕ Coffee</h3>
              <p>Third wave coffee enthusiast</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          id="contact"
          className="about-section contact-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2>Get In Touch</h2>
          <div className="contact-info">
            <a href="tel:650-690-2359" className="contact-link">
              <span>📱</span> 650-690-2359
            </a>
            <a href="mailto:taylorzhu.jobs@gmail.com" className="contact-link">
              <span>📧</span> taylorzhu.jobs@gmail.com
            </a>
            <a href="https://linkedin.com/in/taylorzhu" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>💼</span> LinkedIn
            </a>
            <a href="https://github.com/lllyt8" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span>💻</span> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
