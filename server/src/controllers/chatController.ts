// src/controllers/chatController.ts
import { Request, Response } from "express";
import { generatePrompt } from "../config/prompts";

export const handleChat = async (req: Request, res: Response) => {
  try {
    const userMessage = req.body.message;
    const prompt = generatePrompt(userMessage);

    // 打印请求信息以进行调试
    console.log("API Key:", process.env.OPENAI_API_KEY ? "[Set]" : "[Not Set]");
    console.log("User message:", userMessage);

    // 创建一个带超时的 fetch 请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            ...prompt,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      // 打印响应状态以进行调试
      console.log("OpenAI API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API error:", errorText);
        throw new Error(
          `API responded with status: ${response.status}. Details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(
        "OpenAI API response data:",
        JSON.stringify(data).substring(0, 200) + "..."
      );

      // 确保响应格式与前端期望的一致
      if (
        !data.choices ||
        !data.choices[0] ||
        !data.choices[0].message ||
        !data.choices[0].message.content
      ) {
        throw new Error("Invalid response format from OpenAI API");
      }

      // 返回正确的响应格式
      res.json(data);
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("OpenAI API request timed out");
        return res.status(504).json({
          error: "Request timed out",
          message: "The AI is taking too long to respond. Please try again.",
        });
      }
      throw fetchError;
    }
  } catch (error: unknown) {
    console.error("Chat processing error:", error);
    res.status(500).json({
      error: "Failed to process chat request",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
