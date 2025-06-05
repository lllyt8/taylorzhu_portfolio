
import { motion } from 'framer-motion';
import { PageType } from '../types/navigation';
import { PERSONAL_INFO, STATS_DATA, LANDING_PAGE_ANIMATIONS } from '../types/landing';
import { useLanguage } from '../contexts/LanguageContext';
import ResponsiveImage from './common/ResponsiveImage';
import { LandingPageSkeleton } from './common/Skeleton';
import '../styles/landing-page.css';

interface LandingPageProps {
  onOpenChat: () => void;
  onNavigate: (page: PageType) => void;
}

const LandingPage = ({ onOpenChat, onNavigate }: LandingPageProps) => {
  const { t, isLoading: languageLoading } = useLanguage();

  // 只有在语言加载时才显示骨架屏
  if (languageLoading) {
    return <LandingPageSkeleton />;
  }
  return (
    <motion.div
      className="landing-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={LANDING_PAGE_ANIMATIONS.pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="left-content">
        <header>
          <h1>
            {t('landing.greeting')}<br />
            <span className="highlight" aria-label={PERSONAL_INFO.name}>{PERSONAL_INFO.name}</span>
          </h1>
          <h2>{t('landing.title')}</h2>
          <p>{t('landing.description')}</p>
        </header>
        <nav className="action-buttons" aria-label={t('accessibility.mainNavigation')}>
          <button
            type="button"
            className="primary-btn"
            onClick={() => onNavigate('about')}
            aria-label={t('landing.buttons.aboutAriaLabel')}
          >
            {t('landing.buttons.about')}
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onNavigate('contact')}
            aria-label={t('landing.buttons.contactAriaLabel')}
          >
            {t('landing.buttons.contact')}
          </button>
        </nav>
      </div>

      <div className="center-content">
        <div className="image-container">
          <ResponsiveImage
            src={PERSONAL_INFO.profileImage}
            alt={t('accessibility.profileImage', { name: PERSONAL_INFO.name })}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
          <motion.button
            type="button"
            className="chat-bubble"
            onClick={onOpenChat}
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-label={t('landing.chat.ariaLabel')}
          >
            <span role="img" aria-label={t('accessibility.sparkles')}>✨</span>
            {t('landing.chat.bubble')}
          </motion.button>
        </div>
      </div>

      <aside className="right-content" aria-label={t('accessibility.professionalStatistics')}>
        <div className="stats">
          {STATS_DATA.map((stat, index) => {
            const translationKey = stat.label.includes('Experience') ? 'landing.stats.experience' : 'landing.stats.projects';
            const ariaLabelKey = stat.label.includes('Experience') ? 'landing.stats.experienceAriaLabel' : 'landing.stats.projectsAriaLabel';

            return (
              <div key={index} className="stat-card">
                <h3 aria-label={t(ariaLabelKey, { value: stat.value })}>{stat.value}</h3>
                <p>{t(translationKey)}</p>
              </div>
            );
          })}
        </div>
      </aside>
    </motion.div>
  );
};

export default LandingPage;
