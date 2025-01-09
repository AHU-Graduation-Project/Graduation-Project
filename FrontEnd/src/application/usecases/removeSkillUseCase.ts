// src/application/usecases/removeSkillUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for removing a skill
export const removeSkillUseCase = (skill: string) => {
  useAuthStore.getState().removeSkill(skill);
};
