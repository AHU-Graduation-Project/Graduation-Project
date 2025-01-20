import axios, { AxiosError } from 'axios';
import { Node, Edge } from 'reactflow';
import useTokenStore from '../../application/state/tokenStore';

export interface RoadmapTopic {
  id: string;
  prerequisites: string;
  roadmap: number;
  label: string;
  type: string;
  description: string;
  position_x: number;
  position_y: number;
  z_index: number | null;
  skill_name: string;
  is_analysis_needed: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  roadmap: number;
  source_handle: string;
  target_handle: string;
  line_style: string;
  animation: boolean;
  type: string;
}

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
    topics: RoadmapTopic[];
    edges: RoadmapEdge[];
  };
}

const transformTopicsToNodes = (topics: RoadmapTopic[]): Node[] => {
  return topics.map(topic => ({
    id: topic.id,
    position: { x: topic.position_x, y: topic.position_y },
    data: {
      label: topic.label,
      prerequisites: topic.prerequisites.split(',').filter(p => p), // Convert string back to array
      type: topic.type,
      description: topic.description,
      skillast_name: topic.skill_name,
      isAnalysisNeeded: topic.is_analysis_needed
    },
    type: 'custom'
  }));
};

const transformEdgesToReactFlow = (edges: RoadmapEdge[]): Edge[] => {
  return edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.source_handle,
    targetHandle: edge.target_handle,
    style: edge.line_style ? { strokeDasharray: edge.line_style } : undefined,
    animated: edge.animation,
    type: edge.type
  }));
};

export function GetRoadmapById(): GetRoadmapById {
  const { token } = useTokenStore();

  return {
    execute: async (id: string): Promise<GetRoadmapByIdResponse> => {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      try {
        const response = await axios.get<GetRoadmapByIdResponse>(
          `${import.meta.env.VITE_PATH_API}/roadmaps/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );
        
        // Transform the response data
        const roadmapData = response.data.roadmap;
        return {
          success: response.data.success,
          roadmap: {
            ...roadmapData,
            topics: transformTopicsToNodes(roadmapData.topics),
            edges: transformEdgesToReactFlow(roadmapData.edges)
          }
        };
        
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message || error.message;
          throw new Error(`Failed to fetch roadmap: ${message}`);
        }
        throw new Error('An unexpected error occurred while fetching roadmap');
      }
    }
  };
}
