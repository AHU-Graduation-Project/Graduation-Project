import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  selectedRoadmaps: string[];
  progress: Record<string, string[]>; // roadmapId -> completed node IDs
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  completedRoadmaps: string[]; // Array of roadmap IDs with 100% completion
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateProgress: (
    roadmapId: string,
    nodeId: string,
    completed: boolean
  ) => void;
  selectRoadmap: (roadmapId: string) => void;
}

// Mock data for total nodes in each roadmap
const roadmapNodeCounts: Record<string, number> = {
  "roadmap-1": 5,
  "roadmap-2": 8,
  "roadmap-3": 10,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      completedRoadmaps: [],
      login: (email, password) => {
        // Simulate API call
        set({
          user: {
            id: "1",
            email,
            name: "Ahmad alshamary",
            selectedRoadmaps: [],
            progress: {},
          },
          isAuthenticated: true,
        });
      },
      signup: (email, password, name) => {
        // Simulate API call
        set({
          user: {
            id: "1",
            email,
            name,
            selectedRoadmaps: [],
            progress: {},
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, completedRoadmaps: [] });
      },
      updateProgress: (roadmapId, nodeId, completed) => {
        set((state) => {
          if (!state.user) return state;

          const progress = { ...state.user.progress };
          const completedNodes = progress[roadmapId] || [];

          // Add or remove the node from progress
          if (completed && !completedNodes.includes(nodeId)) {
            progress[roadmapId] = [...completedNodes, nodeId];
          } else if (!completed) {
            progress[roadmapId] = completedNodes.filter((id) => id !== nodeId);
          }

          // Check if the roadmap is fully completed
          const totalNodes = roadmapNodeCounts[roadmapId] || 0;
          const isComplete = progress[roadmapId]?.length === totalNodes;

          // Update completedRoadmaps array
          const updatedCompletedRoadmaps = isComplete
            ? [...new Set([...state.completedRoadmaps, roadmapId])] // Add roadmap if complete
            : state.completedRoadmaps.filter((id) => id !== roadmapId); // Remove if no longer complete

          return {
            user: {
              ...state.user,
              progress,
            },
            completedRoadmaps: updatedCompletedRoadmaps,
          };
        });
      },
      selectRoadmap: (roadmapId) => {
        set((state) => {
          if (!state.user) return state;

          const selectedRoadmaps = state.user.selectedRoadmaps.includes(
            roadmapId
          )
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
    }),
    {
      name: "auth-storage",
    }
  )
);
