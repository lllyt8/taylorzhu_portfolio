// vercel-build.js
const { execSync } = require('child_process');

console.log('Starting Vercel build process...');

try {
  // 安装 Vite 和相关依赖
  console.log('Installing Vite and dependencies...');
  execSync('npm install vite @vitejs/plugin-react --no-save', { stdio: 'inherit' });
  
  // 运行 Vite 构建
  console.log('Running Vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
