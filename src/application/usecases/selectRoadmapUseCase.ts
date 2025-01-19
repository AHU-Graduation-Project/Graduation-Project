// src/application/usecases/selectRoadmapUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for selecting a roadmap
export const selectRoadmapUseCase = (roadmapId: string) => {
  useAuthStore.getState().selectRoadmap(roadmapId);
};
