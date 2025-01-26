import axios, { AxiosError } from 'axios';
import { Edge, Node } from 'reactflow';
import useTokenStore from '../../application/state/tokenStore';

interface ApiNode {
  id: string;
  prerequisites: string;
  label: string;
  type: string;
  description: string;
  position_x: number;
  position_y: number;
  skill_name: string;
  is_analysis_needed: boolean;
}

interface ApiEdge {
  id: string;
  source: number;
  target: number;
  source_handle: string;
  target_handle: string;
  line_style: string;
  animation: boolean;
  type: string;
}

export interface AddGeneratedRoadmapRequest {
  nodes: Node[];
  edges: Edge[];
  title: string;
  description: string;
}

export interface AddGeneratedRoadmapResponse {
  success: boolean;
  roadmap: {
    id: number;
    slug: string;
  };
}

export interface SaveGeneratedDataRequest {
  nodes: Node[];
  edges: Edge[];
  slug: string;
  roadmapId: number;  // Added roadmapId
}

export interface SaveGeneratedDataResponse {
  success: boolean;
}

export interface AddGeneratedRoadmap {
  execute: (params: AddGeneratedRoadmapRequest) => Promise<AddGeneratedRoadmapResponse>;
  saveData: (params: SaveGeneratedDataRequest) => Promise<SaveGeneratedDataResponse>;
}

const transformNodes = (nodes: Node[]): ApiNode[] => {
  return nodes.map((node) => ({
    id: node.id,
    prerequisites: (node.data.prerequisites || []).join(','),
    label: node.data.label || '',
    type: node.data.type || '',
    description: node.data.description || '',
    position_x: node.position.x,
    position_y: node.position.y,
    skill_name: node.data.skillast_name || '',
    is_analysis_needed: node.data.isAnalysisNeeded || false,
  }));
};

const transformEdges = (edges: Edge[]): ApiEdge[] => {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    source_handle: edge.sourceHandle || '',
    target_handle: edge.targetHandle || '',
    line_style: edge.style?.strokeDasharray || '',
    animation: edge.animated || false,
    type: edge.type || '',
  }));
};

export function AddGeneratedRoadmap(): AddGeneratedRoadmap {
  const { token } = useTokenStore();

  return {
    execute: async (
      params: AddGeneratedRoadmapRequest,
    ): Promise<AddGeneratedRoadmapResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      try {
        const transformedData = {
          title: params.title,
          description: params.description,
          icon:"bot"
        };

        const response = await axios.post<AddGeneratedRoadmapResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/generated`,
          transformedData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to create generated roadmap: ${message}`);
        }
        throw new Error(
          'An unexpected error occurred while creating generated roadmap',
        );
      }
    },

    saveData: async (
      params: SaveGeneratedDataRequest,
    ): Promise<SaveGeneratedDataResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      try {
        const transformedData = {
          topics: transformNodes(params.nodes),
          edges: transformEdges(params.edges),
          id: params.roadmapId,  // Include roadmapId in request body
        };

        const response = await axios.post<SaveGeneratedDataResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/generated-data/${
            params.slug
          }`,
          transformedData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to save generated roadmap data: ${message}`);
        }
        throw new Error(
          'An unexpected error occurred while saving generated roadmap data',
        );
      }
    },
  };
}
