import axios, { AxiosError } from 'axios';
import useTokenStore from '../../application/state/tokenStore';

export interface VisibilityResponse {
  success: boolean;
  message: string;
  roadmap: {
    slug: string;
  };
}

export interface ToggleRoadmapVisibility {
  execute: (slug: string) => Promise<VisibilityResponse>;
}

export function ToggleRoadmapVisibility(): ToggleRoadmapVisibility {
  const { token } = useTokenStore();

  return {
    execute: async (slug: string): Promise<VisibilityResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      try {
        const response = await axios.post<VisibilityResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/publish/${slug}`,
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
          throw new Error(`Failed to change roadmap state: ${message}`);
        }
        throw new Error(
          `An unexpected error occurred while publishing roadmap`,
        );
      }
    },
  };
}
