import axios, { AxiosError } from 'axios';
import { Edge, Node } from 'reactflow';
import useTokenStore from '../../application/state/tokenStore';

interface ApiNode {
  id: string;
  prerequisites: string; // Changed from string[] to string
  label: string;
  type: string;
  description: string;
  position_x: number;
  position_y: number;
  skill_name: string;
  is_analysis_needed: boolean;
}

export interface SaveRoadmapDataRequest {
  nodes: Node[];
  edges: Edge[];
  id: string;
}

export interface SaveRoadmapDataResponse {
  success: boolean;
}

export interface SaveRoadmapData {
  execute: (params: SaveRoadmapDataRequest) => Promise<SaveRoadmapDataResponse>;
}

const transformNodes = (nodes: Node[]): ApiNode[] => {
  return nodes.map(node => ({
    id: node.id,
    prerequisites: (node.data.prerequisites || []).join(','), // Convert array to comma-separated string
    label: node.data.label || '',
    type: node.data.type || '',
    description: node.data.description || '',
    position_x: node.position.x,
    position_y: node.position.y,
    skill_name: node.data.skillast_name || '',
    is_analysis_needed: node.data.isAnalysisNeeded || false
  }));
};

export function SaveRoadmapData(): SaveRoadmapData {
  const { token } = useTokenStore();

  return {
    execute: async (params: SaveRoadmapDataRequest): Promise<SaveRoadmapDataResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      try {
        const transformedData = {
          ...params,
          nodes: transformNodes(params.nodes)
        };

        const response = await axios.patch<SaveRoadmapDataResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/roadmap/${params.id}`,
          transformedData,
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
          throw new Error(`Failed to save roadmap data: ${message}`);
        }
        throw new Error('An unexpected error occurred while saving roadmap data');
      }
    }
  };
}
