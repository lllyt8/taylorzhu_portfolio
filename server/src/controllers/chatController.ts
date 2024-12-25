// src/controllers/chatController.ts
import { Request, Response } from 'express';
import { generatePrompt } from '../config/prompts';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const userMessage = req.body.message;
    const prompt = generatePrompt(userMessage);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        ...prompt
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat request' });
  }
};
