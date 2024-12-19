import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateProgress: (roadmapId: string, nodeId: string, completed: boolean) => void;
  selectRoadmap: (roadmapId: string) => void;
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
    }),
    {
      name: 'auth-storage',
    }
  )
);