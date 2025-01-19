import axios, { AxiosError } from 'axios';
import useTokenStore from '../../application/state/tokenStore';

export interface EditRoadmapRequest {
  title?: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_official?: boolean;
  visibility?: 'public' | 'private' | 'hidden';
}

export interface EditRoadmapResponse {
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
    topics: any[];
    edges: any[];
  };
}

export interface EditRoadmap {
  execute: (id: string, data: EditRoadmapRequest) => Promise<EditRoadmapResponse>;
}

export function EditRoadmap(): EditRoadmap {
  const { token } = useTokenStore();

  return {
    execute: async (id: string, data: EditRoadmapRequest): Promise<EditRoadmapResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      try {
        const response = await axios.put<EditRoadmapResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/${id}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to edit roadmap: ${message}`);
        }
        throw new Error('An unexpected error occurred while editing roadmap');
      }
    }
  };
}
