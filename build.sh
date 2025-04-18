#!/bin/bash

# 安装全局依赖
npm install -g vite @vitejs/plugin-react

# 安装项目依赖
npm install

# 运行构建
npx vite build
