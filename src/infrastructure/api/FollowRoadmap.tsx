import axios, { AxiosError } from 'axios';
import useTokenStore from '../../application/state/tokenStore';

export interface FollowRoadmapResponse {
  success: boolean;
  roadmap: any;
}

export function FollowRoadmap() {
  const { token , getUser } = useTokenStore();
    const user = getUser();

  return {
    execute: async (slug: string): Promise<FollowRoadmapResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      try {
        const response = await axios.post<FollowRoadmapResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/follow/${slug}`,
          {user:user},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data)
        return response.data;

      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to follow roadmap: ${message}`);
        }
        throw new Error('An unexpected error occurred while following roadmap');
      }
    }
  };
}
