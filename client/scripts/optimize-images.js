import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建优化图片的目录
const optimizedDir = path.join(__dirname, '../public/images/optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// 优化主页照片
const profilePic = path.join(__dirname, '../public/profile_pic.jpg');
const outputPath = path.join(optimizedDir, 'profile_pic.jpg');
const outputPathWebp = path.join(optimizedDir, 'profile_pic.webp');
const outputPathAvif = path.join(optimizedDir, 'profile_pic.avif');

// 创建不同尺寸的图片
const sizes = [400, 800, 1200];

async function optimizeImage() {
  try {
    // 获取原始图片信息
    const metadata = await sharp(profilePic).metadata();
    console.log(`Original image: ${metadata.width}x${metadata.height}, ${metadata.size} bytes`);

    // 创建 JPEG 版本
    await sharp(profilePic)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(outputPath);

    // 创建 WebP 版本
    await sharp(profilePic)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPathWebp);

    // 创建 AVIF 版本
    await sharp(profilePic)
      .resize({ width: 1200, withoutEnlargement: true })
      .avif({ quality: 65 })
      .toFile(outputPathAvif);

    // 创建响应式图片
    for (const size of sizes) {
      await sharp(profilePic)
        .resize({ width: size, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(optimizedDir, `profile_pic_${size}.jpg`));

      await sharp(profilePic)
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(optimizedDir, `profile_pic_${size}.webp`));
    }

    // 获取优化后的图片信息
    const optimizedMetadata = await sharp(outputPath).metadata();
    console.log(`Optimized image: ${optimizedMetadata.width}x${optimizedMetadata.height}, ${optimizedMetadata.size} bytes`);
    console.log(`Compression ratio: ${(optimizedMetadata.size / metadata.size * 100).toFixed(2)}%`);

    console.log('Image optimization completed successfully!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage();
