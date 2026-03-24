export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:5005/api';

export const profileRepository = {
  getProfile: async (signal?: AbortSignal): Promise<UserProfile> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, { signal });
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        throw error;
      }
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
};
