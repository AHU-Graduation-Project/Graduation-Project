import axios from 'axios';

export interface GetRoadmapByIdResponse {
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

export function getRoadmaplist() {
  return {
    execute: async (): Promise<GetRoadmapByIdResponse> => {
      try {
        const response = await axios.get<GetRoadmapByIdResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps`,
          {
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
