import { UserEntity } from "../../domain/entities/User";
import { useAuthStore } from "../state/authStore";

// Use case for logging in
export const loginUseCase = (email: string, password: string) => {
  useAuthStore.setState((state) => {
    const user = new UserEntity(
      "1",
      email,
      "Ahmad",
      "Alshamary",
      password,
      "", // Your image
      "",
      "",
      "",
      [],
      [],
      [],
      [],
      {}
    );

    return {
      user,
      isAuthenticated: true,
    };
  });
};

// Use case for signing up
export const signupUseCase = (
  email: string,
  password: string,
  fname: string,
  lname: string,
  position: string,
  level: string,
  country: string
) => {
  useAuthStore.setState((state) => {
    const user = new UserEntity(
      "1",
      email,
      fname,
      lname,
      password,
      "", // Your image
      position,
      level,
      country,
      [],
      [],
      [],
      [],
      {}
    );

    return {
      user,
      isAuthenticated: true,
    };
  });
};

// Use case for logging out
export const logoutUseCase = () => {
  useAuthStore.setState(() => ({
    user: null,
    isAuthenticated: false,
    completedRoadmaps: [],
  }));
};