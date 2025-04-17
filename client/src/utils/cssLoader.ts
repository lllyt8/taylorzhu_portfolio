/**
 * 延迟加载 CSS 文件
 * @param href CSS 文件路径
 */
export const loadCSS = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    
    document.head.appendChild(link);
  });
};

/**
 * 预加载 CSS 文件
 * @param href CSS 文件路径
 */
export const preloadCSS = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  
  document.head.appendChild(link);
};
