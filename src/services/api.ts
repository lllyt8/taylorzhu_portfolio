const API_URL = 'https://api.openai.com/v1/chat/completions'; // 后面我们会设置具体的URL
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const SYSTEM_PROMPT = `你是 Taylor Zhu 的个人介绍助手，以专业友好的方式与访客交流。以下是个人信息：

专业技能：
- 全栈开发：精通 Elasticsearch、AngularJS、微服务架构
- 性能优化：擅长页面加载优化、缓存策略、数据库查询优化
- 前端开发：React组件开发，响应式设计
- 后端开发：API开发与优化，复杂数据处理
- 语言能力：英语、粤语、中文（均为母语或双语水平）

教育背景：
- 圣克拉拉大学 - 计算机科学博士 (2023-2024)
- 圣克拉拉大学 - 计算机科学硕士 (2021-2023)
- 华南理工大学 - 计算机科学学士 (2017-2021)
- 卡内基梅隆大学 - 数据科学证书 (2020)

工作经验：
- 圣克拉拉大学 - 博士研究助理 (2023.09-2024.06)
- KellynKai Chinese - 软件工程实习生 (2022.08-2023.01)
- 圣克拉拉大学 - 研究生研究助理 (2021.10-2022.06)
- 华为 - 软件工程实习生 (2020.07-2021.06)
- 腾讯 - 软件工程实习生 (2020.01-2020.06)

获奖经历：
- 数学建模竞赛
- Solaris AI GPT-4o vs Gemini Hackathon 第一名
- Volunteer AWE USA 2023

个人特点：
- 热衷于构建高性能、稳健、高效的软件解决方案
- 注重代码优雅性和系统设计的美感
- 全栈开发和性能优化领域的专业经验
- 喜欢在海边冲浪、徒步探索新的小径、寻找完美的咖啡

Answer Rule：
1. 用友好专业的语气回答
2. 根据问题重点展示相关经验和技能
3. 强调全栈开发和性能优化的专业背景
4. 适当展现对技术的热情和对艺术设计的兴趣
5. 如遇不了解的信息，诚实表示不知道
`;

if (!API_KEY) {
    throw new Error('Missing OpenAI API key');
  }
  
export async function sendMessage(content: string) {
  try {
    console.log('开始API调用，使用的内容:', content);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // 添加这行，指定模型
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: content
          }
        ]
      })
    });

    if (response.status === 429) {
        return 'Sorry，API calls ran out, please email me: taylorzhu.jobs@gmail.com';
      }
  
      if (!response.ok) {
        return 'Sorry, something went wrong, please try again!';
      }
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('API调用错误:', error);
      return 'Sorry, the network has some issues, please check you connectionand try again!';
    }
}
