import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  width,
  height,
  loading = 'lazy',
  fallbackSrc = '/api/placeholder/800/400'
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // 从原始路径生成优化图片的路径
  const getOptimizedPath = (originalPath: string, size?: number, format?: string) => {
    const baseName = originalPath.split('/').pop()?.split('.')[0];
    const sizeStr = size ? `_${size}` : '';
    const ext = format || 'jpg';
    return `/images/optimized/${baseName}${sizeStr}.${ext}`;
  };

  // 处理图片加载错误
  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setError(true);
  };

  // 处理图片加载完成
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // 重置状态，当src变化时
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // 如果加载失败，使用占位图
  if (error) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={`${className} fallback`}
        width={width}
        height={height}
      />
    );
  }

  return (
    <picture>
      {/* AVIF 格式 - 最佳压缩但兼容性较低 */}
      <source
        srcSet={getOptimizedPath(src, undefined, 'avif')}
        type="image/avif"
      />
      
      {/* WebP 格式 - 良好压缩和兼容性 */}
      <source
        srcSet={`
          ${getOptimizedPath(src, 400, 'webp')} 400w,
          ${getOptimizedPath(src, 800, 'webp')} 800w,
          ${getOptimizedPath(src, 1200, 'webp')} 1200w
        `}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* JPEG 格式 - 最佳兼容性 */}
      <source
        srcSet={`
          ${getOptimizedPath(src, 400, 'jpg')} 400w,
          ${getOptimizedPath(src, 800, 'jpg')} 800w,
          ${getOptimizedPath(src, 1200, 'jpg')} 1200w
        `}
        sizes={sizes}
        type="image/jpeg"
      />
      
      {/* 回退图片 */}
      <img
        src={getOptimizedPath(src)}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default ResponsiveImage;
