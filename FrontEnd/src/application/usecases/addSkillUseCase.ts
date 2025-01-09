// src/application/usecases/addSkillUseCase.ts
import { useAuthStore } from "../state/authStore";

// Use case for adding a skill
export const addSkillUseCase = (skill: string) => {
  useAuthStore.getState().addSkill(skill);
};
