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
    execute: async (page: number = 1, limit: number = 1000, search: string = ''): Promise<GetRoadmapListResponse> => {
      try {
        const cleanSearch = search
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
          .trim(); // Additional trim in case of leading/trailing spaces
          
        const response = await axios.get<GetRoadmapListResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps`,
          {
            params: {
              page,
              limit,
              search: cleanSearch,
            },
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }),
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
