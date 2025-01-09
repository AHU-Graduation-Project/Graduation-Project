// src/application/usecases/saveGeneratedRoadmapUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for saving a generated roadmap
export const saveGeneratedRoadmapUseCase = (
  title: string,
  description: string,
  nodes: { id: string; type: string; data: { label: string } }[],
  edges: { id: string; source: string; target: string }[]
) => {
  useAuthStore
    .getState()
    .saveGeneratedRoadmap(title, description, nodes, edges);
};
