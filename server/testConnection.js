const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('尝试连接到: ', MONGODB_URI ? MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'MONGODB_URI 未定义');

if (!MONGODB_URI) {
  console.error('错误: MONGODB_URI 环境变量未设置');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('成功连接到 MongoDB');
    mongoose.connection.db.listCollections().toArray()
      .then(collections => {
        console.log('数据库中的集合:');
        collections.forEach(collection => {
          console.log(`- ${collection.name}`);
        });
        process.exit(0);
      });
  })
  .catch(err => {
    console.error('MongoDB 连接错误:', err);
    process.exit(1);
  });
