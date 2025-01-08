import { create } from "zustand";
import { persist } from "zustand/middleware";
import img from "../assets/images/mike_wazowski_meme_png_by_kylewithem_dg65n12-fullview.png";

interface User {
  id: string;
  email: string;
  fname: string;
  lname: string;
  password: string;
  profilePicture: string;
  position: string;
  level: string;
  country: string;
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
        if (email === "ahmad@gmail.com" && password === "1234") {
          set({
            user: {
              id: "1",
              email,
              fname: "Ahmad",
              lname: "Alshamary",
              password,
              profilePicture: img,
              position: "",
              level: "",
              country: "",
              selectedRoadmaps: [],
              completedRoadmaps: [],
              selectedSkills: [],
              progress: {},
            },
            isAuthenticated: true,
          });
        }
      },
      signup: (email, password, fname, lname, position, level, country) => {
        set({
          user: {
            id: "1",
            email,
            fname,
            lname,
            password,
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

          if (completed && !completedNodes.includes(nodeId)) {
            progress[roadmapId] = [...completedNodes, nodeId];
          } else if (!completed) {
            progress[roadmapId] = completedNodes.filter((id) => id !== nodeId);
          }

          const totalNodes = roadmapNodeCounts[roadmapId] || 0;
          const isComplete = progress[roadmapId]?.length === totalNodes;

          const updatedCompletedRoadmaps = isComplete
            ? [...new Set([...state.completedRoadmaps, roadmapId])]
            : state.completedRoadmaps.filter((id) => id !== roadmapId);

          return {
            user: { ...state.user, progress },
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
            user: { ...state.user, selectedRoadmaps },
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
            user: { ...state.user, selectedSkills },
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
            user: { ...state.user, selectedSkills },
          };
        });
      },
      updateUser: (updatedData) => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: { ...state.user, ...updatedData },
          };
        });
      },
      // updateUser: (updatedData) => {
      //   set((state) => {
      //     if (!state.user) return state;
      //     return {
      //       user: { ...state.user, selectedRoadmaps },
      //     };
      //   });
      // },
    }),
    {
      name: "auth-storage",
    }
  )
);
