import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  selectedRoadmaps: string[];
  customRoadmaps: Record<string, {
    title: string;
    description: string;
    nodes: any[];
    edges: any[];
  }>;
  progress: Record<string, string[]>; // roadmapId -> completed node IDs
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateProgress: (roadmapId: string, nodeId: string, completed: boolean) => void;
  selectRoadmap: (roadmapId: string) => void;
  saveCustomRoadmap: (id: string, title: string, description: string, nodes: any[], edges: any[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        // Simulate API call
        set({
          user: {
            id: '1',
            email,
            name: 'Ahmad alshamary',
            selectedRoadmaps: [],
            customRoadmaps: {},
            progress: {},
          },
          isAuthenticated: true,
        });
      },
      signup: (email, password, name) => {
        // Simulate API call
        set({
          user: {
            id: '1',
            email,
            name,
            selectedRoadmaps: [],
            customRoadmaps: {},
            progress: {},
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProgress: (roadmapId, nodeId, completed) => {
        set((state) => {
          if (!state.user) return state;

          const progress = { ...state.user.progress };
          const completedNodes = progress[roadmapId] || [];

          if (completed && !completedNodes.includes(nodeId)) {
            progress[roadmapId] = [...completedNodes, nodeId];
          } else if (!completed) {
            progress[roadmapId] = completedNodes.filter((id) => id !== nodeId);
          }

          return {
            user: {
              ...state.user,
              progress,
            },
          };
        });
      },
      selectRoadmap: (roadmapId) => {
        set((state) => {
          if (!state.user) return state;

          const selectedRoadmaps = state.user.selectedRoadmaps.includes(roadmapId)
            ? state.user.selectedRoadmaps.filter((id) => id !== roadmapId)
            : [...state.user.selectedRoadmaps, roadmapId];

          return {
            user: {
              ...state.user,
              selectedRoadmaps,
            },
          };
        });
      },
      saveCustomRoadmap: (id, title, description, nodes, edges) => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              customRoadmaps: {
                ...state.user.customRoadmaps,
                [id]: {
                  title,
                  description,
                  nodes,
                  edges,
                }
              },
              selectedRoadmaps: state.user.selectedRoadmaps.includes(id)
                ? state.user.selectedRoadmaps
                : [...state.user.selectedRoadmaps, id]
            }
          };
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);