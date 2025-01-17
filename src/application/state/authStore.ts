// src/application/state/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEntity } from "../../domain/entities/User";
import img from "../../shared/assets/images/mike_wazowski_meme_png_by_kylewithem_dg65n12-fullview.png"

const roadmapNodeCounts: { [key: string]: number } = {};

interface IAuthState {
  user: UserEntity | null;
  isAuthenticated: boolean;
  completedRoadmaps: string[];
  login: (email: string, password: string) => void;
  signup: (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    position: string,
    level: string,
    country: string,
    aboutme: string,
    isEmailConformed: boolean
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

export const useAuthStore = create<IAuthState>()(
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
          "",
          false,
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
      signup: (
        email,
        password,
        first_name,
        last_name,
        position,
        level,
        country,
        aboutme,
        isEmailConformed
      ) => {
        const user = new UserEntity(
          "1",
          email,
          first_name,
          last_name,
          password,
          img,
          position,
          level,
          country,
          aboutme,
          isEmailConformed,
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

          const updatedUser = new UserEntity(
            state.user.id,
            state.user.email,
            state.user.first_name,
            state.user.last_name,
            state.user.password,
            state.user.profilePicture,
            state.user.position,
            state.user.level,
            state.user.country,
            state.user.aboutme,
            state.user.isEmailConformed,
            state.user.selectedRoadmaps,
            state.user.completedRoadmaps,
            state.user.generatedRoadmaps,
            state.user.selectedSkills,
            progress
          );

          return {
            user: updatedUser,
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
      // setToken: (tokken) => {
      //   set((state) => {
      //     if(!state.user) return state;

      //   })
      // }
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
