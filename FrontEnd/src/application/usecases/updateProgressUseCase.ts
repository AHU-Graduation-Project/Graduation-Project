// src/application/usecases/updateProgressUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for updating user progress on a roadmap node
export const updateProgressUseCase = (
  roadmapId: string,
  nodeId: string,
  completed: boolean
) => {
  useAuthStore.getState().updateProgress(roadmapId, nodeId, completed);
};
