import { apiClient } from './api';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/users/profile');
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.put<UserProfile>('/users/profile', data);
  },
};
