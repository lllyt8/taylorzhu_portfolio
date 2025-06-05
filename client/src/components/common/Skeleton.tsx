import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number; // 用于文本骨架屏的行数
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius,
  className = '',
  variant = 'text',
  animation = 'pulse',
  lines = 1,
}) => {
  const getDefaultBorderRadius = () => {
    switch (variant) {
      case 'circular':
        return '50%';
      case 'rectangular':
        return '4px';
      case 'text':
        return '4px';
      default:
        return '4px';
    }
  };

  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    `skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  // 创建 CSS 自定义属性
  const cssVariables = {
    '--skeleton-width': typeof width === 'number' ? `${width}px` : width,
    '--skeleton-height': typeof height === 'number' ? `${height}px` : height,
    '--skeleton-border-radius': borderRadius || getDefaultBorderRadius(),
  } as React.CSSProperties;

  // 如果是文本类型且有多行，渲染多个骨架屏
  if (variant === 'text' && lines > 1) {
    return (
      <div className="skeleton-text-container" style={cssVariables}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`${skeletonClasses} ${index === lines - 1 ? 'skeleton--last-line' : ''}`}
          />
        ))}
      </div>
    );
  }

  return <div className={skeletonClasses} style={cssVariables} />;
};

// 预定义的骨架屏组件
export const SkeletonText: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton {...props} variant="text" />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton {...props} variant="circular" />
);

export const SkeletonRectangle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton {...props} variant="rectangular" />
);

// LandingPage 专用骨架屏
export const LandingPageSkeleton: React.FC = () => {
  return (
    <div className="landing-page-skeleton">
      <div className="left-content-skeleton">
        <div className="header-skeleton">
          <SkeletonText height="3rem" width="80%" />
          <SkeletonText height="2rem" width="90%" />
          <SkeletonText height="1.2rem" lines={2} />
        </div>
        <div className="buttons-skeleton">
          <SkeletonRectangle height="3rem" width="120px" borderRadius="8px" />
          <SkeletonRectangle height="3rem" width="120px" borderRadius="8px" />
        </div>
      </div>

      <div className="center-content-skeleton">
        <div className="image-skeleton">
          <SkeletonRectangle height="500px" width="400px" borderRadius="8px" />
          <SkeletonRectangle 
            height="50px" 
            width="150px" 
            borderRadius="25px" 
            className="chat-bubble-skeleton"
          />
        </div>
      </div>

      <div className="right-content-skeleton">
        <div className="stats-skeleton">
          <div className="stat-card-skeleton">
            <SkeletonText height="2.5rem" width="60px" />
            <SkeletonText height="1rem" width="120px" />
          </div>
          <div className="stat-card-skeleton">
            <SkeletonText height="2.5rem" width="60px" />
            <SkeletonText height="1rem" width="120px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
