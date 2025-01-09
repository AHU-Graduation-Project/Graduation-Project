// src/application/usecases/deleteGeneratedRoadmapUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for deleting a generated roadmap
export const deleteGeneratedRoadmapUseCase = (roadmapId: string) => {
  useAuthStore.getState().deleteGeneratedRoadmap(roadmapId);
};
