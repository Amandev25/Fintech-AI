import { apiClient } from './api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

export const aiService = {
  async chat(message: string): Promise<ChatResponse> {
    return apiClient.post<ChatResponse>('/ai/chat', { message });
  },
};
