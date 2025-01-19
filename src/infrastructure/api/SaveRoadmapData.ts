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

const transformEdges = (edges: Edge[]): ApiEdge[] => {
  return edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    source_handle: edge.sourceHandle || '',
    target_handle: edge.targetHandle || '',
    line_style: edge.style?.strokeDasharray || '',
    animation: edge.animated || false,
    type: edge.type || ''
  }));
};

export function SaveRoadmapData(): SaveRoadmapData {
  const { token } = useTokenStore();

  return {
    execute: async (params: SaveRoadmapDataRequest): Promise<SaveRoadmapDataResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }
 console.log(params.id)
      try {
        const transformedData = {
          topics: transformNodes(params.nodes),
          edges: transformEdges(params.edges)
        };

        const response = await axios.patch<SaveRoadmapDataResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/${params.id}`,
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
