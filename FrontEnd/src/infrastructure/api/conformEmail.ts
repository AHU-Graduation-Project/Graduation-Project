export interface PostUserDto {
  email: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  token: string;
}

export interface IConfirmEmailResponse {
  success: boolean;
  token: string;
}

// // state/tokenStore.ts (assuming this is your existing store)
// import { create } from "zustand";

// interface TokenState {
//   token: string | null;
//   setToken: (token: string) => void;
//   clearToken: () => void;
// }

// const useTokenStore = create<TokenState>((set) => ({
//   token: null,
//   setToken: (token) => set({ token }),
//   clearToken: () => set({ token: null }),
// }));

// export default useTokenStore;

// api/auth/confirmEmail.ts
import axios, { AxiosError } from "axios";
import useTokenStore from "../../application/state/tokenStore";

export const confirmEmail = async (
  confirmToken: string
): Promise<IConfirmEmailResponse> => {
  const { setToken } = useTokenStore.getState();

  try {
    const res = await axios.post<IConfirmEmailResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/confirm-email`,
      null,
      {
        headers: {
          Authorization: `Bearer ${confirmToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      setToken(res.data.token); // Save the new token in the store
      return res.data;
    } else {
      throw new Error("Email confirmation failed");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Email confirmation failed"
      );
    } else {
      throw error;
    }
  }
};

export default confirmEmail;
