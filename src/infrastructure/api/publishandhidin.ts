import axios, { AxiosError } from 'axios';
import useTokenStore from '../../application/state/tokenStore';

export interface VisibilityResponse {
  success: boolean;
  message: string;
  roadmap: {
    id: number;
  };
}

export interface ToggleRoadmapVisibility {
  execute: (id: string, currentVisibility: string) => Promise<VisibilityResponse>;
}

export function ToggleRoadmapVisibility(): ToggleRoadmapVisibility {
  const { token } = useTokenStore();

  return {
    execute: async (id: string, currentVisibility: string): Promise<VisibilityResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const endpoint = currentVisibility === 'publish'

      try {
        const response = await axios.post<VisibilityResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/publish/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to ${endpoint} roadmap: ${message}`);
        }
        throw new Error(`An unexpected error occurred while ${endpoint}ing roadmap`);
      }
    }
  };
}
