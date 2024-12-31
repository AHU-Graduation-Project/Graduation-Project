import { create } from "zustand";
import { persist } from "zustand/middleware";
import img from "../assets/images/dummy-user-img-1.png";

interface User {
  id: string;
  email: string;
  fname: string;
  lname: string;
  profilePicture: string;
  position: string; // New field
  level: string; // New field
  country: string; // New field
  selectedRoadmaps: string[];
  completedRoadmaps: string[];
  selectedSkills: string[];
  progress: Record<string, string[]>; // roadmapId -> completed node IDs
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  completedRoadmaps: string[];
  login: (email: string, password: string) => void;
  signup: (
    email: string,
    password: string,
    fname: string,
    lname: string,
    position: string,
    level: string,
    country: string
  ) => void;
  logout: () => void;
  updateProgress: (
    roadmapId: string,
    nodeId: string,
    completed: boolean
  ) => void;
  selectRoadmap: (roadmapId: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  updateUser: (updatedData: Partial<User>) => void;
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
            fname: "ahmad",
            lname: "alshamary",
            profilePicture: img,
            position: "Front end", // Example value
            level: "Intermediate", // Example value
            country: "Jordan", // Example value
            selectedRoadmaps: [],
            completedRoadmaps: [],
            selectedSkills: ["CSS", "HTML"],
            progress: {},
          },
          isAuthenticated: true,
        });
      },
      signup: (email, password, fname, lname, position, level, country) => {
        // Simulate API call
        set({
          user: {
            id: "1",
            email,
            fname,
            lname,
            profilePicture: img,
            position,
            level,
            country,
            selectedRoadmaps: [],
            completedRoadmaps: [],
            selectedSkills: [],
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

          if (nodeId) {
            // Add or remove the node from progress
            if (completed && !completedNodes.includes(nodeId)) {
              progress[roadmapId] = [...completedNodes, nodeId];
            } else if (!completed) {
              progress[roadmapId] = completedNodes.filter(
                (id) => id !== nodeId
              );
            }
          }
          // Check if the roadmap is fully completed
          const totalNodes = roadmapNodeCounts[roadmapId] || 0;
          const isComplete = progress[roadmapId]?.length === totalNodes;

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
      addSkill: (skill) => {
        set((state) => {
          if (!state.user) return state;

          const selectedSkills = state.user.selectedSkills.includes(skill)
            ? state.user.selectedSkills
            : [...state.user.selectedSkills, skill];

          return {
            user: {
              ...state.user,
              selectedSkills,
            },
          };
        });
      },
      removeSkill: (skill) => {
        set((state) => {
          if (!state.user) return state;

          const selectedSkills = state.user.selectedSkills.filter(
            (s) => s !== skill
          );

          return {
            user: {
              ...state.user,
              selectedSkills,
            },
          };
        });
      },
      updateUser: (updatedData) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              ...updatedData,
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
