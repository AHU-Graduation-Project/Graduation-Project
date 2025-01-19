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
  const { setToken, clearConfirmToken } = useTokenStore.getState();

  try {
    const response = await axios.post<IConfirmEmailResponse>(
      `${import.meta.env.VITE_PATH_API}/auth/confirm-email`,
      {},  // empty body as per API spec
      {
        headers: {
          'Authorization': `Bearer ${confirmToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      setToken(response.data.token);
      clearConfirmToken();
      return response.data;
    }
    
    throw new Error("Email confirmation failed");
  } catch (error) {
    clearConfirmToken();
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Email confirmation failed");
    }
    throw error;
  }
};

export default confirmEmail;
