// src/application/usecases/updateUserProfileUseCase.ts
import { useAuthStore } from "../state/authStore";
import { UserEntity } from "../../domain/entities/User";

// Use case for updating the user profile
export const updateUserProfileUseCase = (updatedData: Partial<UserEntity>) => {
  useAuthStore.getState().updateUser(updatedData);
};
