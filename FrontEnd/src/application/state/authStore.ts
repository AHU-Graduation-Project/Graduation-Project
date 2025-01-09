// src/application/state/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEntity } from "../../domain/entities/User";
import img from "../../shared/assets/images/mike_wazowski_meme_png_by_kylewithem_dg65n12-fullview.png"

const roadmapNodeCounts: { [key: string]: number } = {};

interface AuthState {
  user: UserEntity | null;
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
  saveGeneratedRoadmap: (
    title: string,
    description: string,
    nodes: { id: string; type: string; data: { label: string } }[],
    edges: { id: string; source: string; target: string }[]
  ) => void;
  deleteGeneratedRoadmap: (roadmapId: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  updateUser: (updatedData: Partial<UserEntity>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      completedRoadmaps: [],
      login: (email, password) => {
        const user = new UserEntity(
          "1",
          email,
          "Ahmad",
          "Alshamary",
          password,
          img,
          "",
          "",
          "",
          [],
          [],
          [],
          [],
          {}
        );

        set({
          user,
          isAuthenticated: true,
        });
      },
      signup: (email, password, fname, lname, position, level, country) => {
        const user = new UserEntity(
          "1",
          email,
          fname,
          lname,
          password,
          img,
          position,
          level,
          country,
          [],
          [],
          [],
          [],
          {}
        );

        set({
          user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, completedRoadmaps: [] });
      },
      updateProgress: (roadmapId, nodeId, completed) => {
        set((state) => {
          if (!state.user) return state;

          state.user.updateProgress(roadmapId, nodeId, completed);

          const totalNodes = roadmapNodeCounts[roadmapId] || 0;
          const isComplete =
            state.user.progress[roadmapId]?.length === totalNodes;

          const updatedCompletedRoadmaps = isComplete
            ? [...new Set([...state.completedRoadmaps, roadmapId])]
            : state.completedRoadmaps.filter((id) => id !== roadmapId);

          return {
            user: state.user,
            completedRoadmaps: updatedCompletedRoadmaps,
          };
        });
      },
      selectRoadmap: (roadmapId) => {
        set((state) => {
          if (!state.user) return state;

          if (state.user.selectedRoadmaps.includes(roadmapId)) {
            state.user.selectedRoadmaps = state.user.selectedRoadmaps.filter(
              (id) => id !== roadmapId
            );
          } else {
            state.user.selectedRoadmaps.push(roadmapId);
          }

          return {
            user: state.user,
          };
        });
      },
      addSkill: (skill) => {
        set((state) => {
          if (!state.user) return state;

          state.user.addSkill(skill);

          return {
            user: state.user,
          };
        });
      },
      removeSkill: (skill) => {
        set((state) => {
          if (!state.user) return state;

          state.user.removeSkill(skill);

          return {
            user: state.user,
          };
        });
      },
      updateUser: (updatedData) => {
        set((state) => {
          if (!state.user) return state;

          state.user.updateProfile(updatedData);

          return {
            user: state.user,
          };
        });
      },
      saveGeneratedRoadmap: (title, description, nodes, edges) => {
        set((state) => {
          if (!state.user) return state;

          const newRoadmap = {
            id: `generated-${Date.now()}`,
            title,
            description,
            nodes,
            edges,
            createdAt: new Date().toISOString(),
          };

          state.user.generatedRoadmaps.push(newRoadmap);

          return {
            user: state.user,
          };
        });
      },
      deleteGeneratedRoadmap: (roadmapId) => {
        set((state) => {
          if (!state.user) return state;

          state.user.generatedRoadmaps = state.user.generatedRoadmaps.filter(
            (roadmap) => roadmap.id !== roadmapId
          );

          return {
            user: state.user,
          };
        });
      },
    }),
    {
      name: "auth-storage-dev-path",
    }
  )
);
