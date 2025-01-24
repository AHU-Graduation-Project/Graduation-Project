import axios from 'axios';
import useTokenStore from '../../application/state/tokenStore';

interface GetRoadmapListResponse {
  success: boolean;
  roadmap: {
    id: number;
    title: string;
    description: string;
    slug: string;
    creator: number;
    is_deleted: boolean;
    is_official: boolean;
    created_at: string;
    updated_at: string;
    icon: string;
    visibility: string;
  };
}

export function GetRoadmaplist() {
  const { getUserId, userRole } = useTokenStore();
  const userId = getUserId();

  return {
    execute: async (): Promise<GetRoadmapListResponse> => {
      try {
        const response = await axios.get<GetRoadmapListResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps`,
          {
            params: {
              user: {id:userId},
              isEditor: userRole() === 2,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data;
      } catch (error) {
        console.error('Failed to fetch roadmap:', error);
        throw new Error('Failed to load roadmap');
      }
    },
  };
}
