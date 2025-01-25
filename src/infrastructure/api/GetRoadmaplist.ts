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
  const { getUser, userRole, token } = useTokenStore();
  const user = getUser();

  return {
    execute: async (page: number = 1, limit: number = 1000): Promise<GetRoadmapListResponse> => {

      console.log('user', user);
      try {
        const response = await axios.get<GetRoadmapListResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps`,
          {
            params: {
              user: user,
              isEditor: userRole() === 2,
              page,
              limit,
            },
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }), // Ensure token is passed in headers
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
