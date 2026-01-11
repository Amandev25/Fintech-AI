import { Response } from "express";
import Groq from "groq-sdk";
import { env } from "../../config/env";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ChatMessage } from "../../models/chatMessage.model";

const groq = new Groq({
  apiKey: env.groqApiKey,
});

export const chatWithAi = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Save user message
    await ChatMessage.create({
      userId,
      message,
      sender: "user",
    });

    // Create chat completion with Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a friendly personal finance assistant for a college student or young professional.
Give simple, practical budgeting and saving advice. 
Avoid investment or legal advice. Keep answers short to medium length.
Be conversational and helpful.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const aiText = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    // Save AI response
    const aiMessage = await ChatMessage.create({
      userId,
      message: aiText,
      sender: "ai",
    });

    res.json({ response: aiMessage.message });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ message: "Failed to get AI response" });
  }
};

export const getAiInsights = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recentMessages = await ChatMessage.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({ messages: recentMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch AI insights" });
  }
};
