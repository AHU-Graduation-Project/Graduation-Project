import axios from 'axios';
import useTokenStore from '../../application/state/tokenStore';
import { roadmaps } from '../../data/roadmaps';

interface UpdateResourcesResponse {
  success: boolean;
  resources: any[];
}

export function UpdateResources() {
  const { token } = useTokenStore();

  return {
    execute: async (
      resources: any[],
      RoadmapID: number,
    ): Promise<UpdateResourcesResponse> => {
      try {
        const formattedData = {
          resources: resources.map(resource => ({
            roadmap: RoadmapID,
            title: resource.title,
            link: resource.link,
            icon: resource.icon
          }))
        };

        const response = await axios.put<UpdateResourcesResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/resources`,
          formattedData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.data;
      } catch (error) {
        console.error('Failed to update resources:', error);
        throw new Error('Failed to update resources');
      }
    },
  };
}
