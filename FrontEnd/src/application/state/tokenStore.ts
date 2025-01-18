// tokenStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string | null;
  expiresAt: string | null;
  isEditor: boolean | null;
  confirmToken: string | null;
  setToken: (newToken: string, expirationMinutes?: number) => void;
  removeToken: () => void;
  updateToken: (updatedToken: string, expirationMinutes?: number) => void;
  userRole: () => permitions;
  getRemainingTime: () => number;
  extendExpiration: (additionalMinutes: number) => void;
  setConfirmToken: (token: string) => void;
  clearConfirmToken: () => void;
}
enum permitions {
  GUEST = 0,
  USER = 1,
  EDITOR = 2,
}

const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      isEditor: null,
      confirmToken: null,

      setToken: (newToken: string, expirationMinutes: number = 60): void => {
        const expiresAt = new Date(
          Date.now() + expirationMinutes * 60 * 1000
        ).toISOString();
        set({
          token: newToken,
          expiresAt: expiresAt,
        });
      },

      removeToken: (): void =>
        set({
          token: null,
          expiresAt: null,
        }),

      updateToken: (updatedToken: string, expirationMinutes?: number): void =>
        set((state) => {
          if (!state.token) {
            console.warn("Cannot update token: No token exists");
            return state;
          }

          const expiresAt = expirationMinutes
            ? new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString()
            : state.expiresAt;

          return {
            token: updatedToken,
            expiresAt: expiresAt,
          };
        }),

      userRole: (): permitions => {
        const state = get();
        if (!state.token || !state.expiresAt) return permitions.GUEST;

        const now = new Date();
        const expirationDate = new Date(state.expiresAt);

        if (now > expirationDate) {
          console.log("HELLO FROM EXOPIRTW", expirationDate, now);
          return permitions.GUEST;
        }
        if (state.isEditor) {
          return permitions.EDITOR;
        }

        return permitions.USER;
      },

      getRemainingTime: (): number => {
        const state = get();
        if (!state.token || !state.expiresAt) return 0;

        const now = new Date();
        const expirationDate = new Date(state.expiresAt);
        const remainingMs = expirationDate.getTime() - now.getTime();
        return Math.max(0, Math.floor(remainingMs / (60 * 1000)));
      },

      extendExpiration: (additionalMinutes: number): void =>
        set((state) => {
          if (!state.token || !state.expiresAt) {
            console.warn("Cannot extend expiration: No token exists");
            return state;
          }

          const currentExpiration = new Date(state.expiresAt);
          const newExpiration = new Date(
            currentExpiration.getTime() + additionalMinutes * 60 * 1000
          );

          return {
            ...state,
            expiresAt: newExpiration.toISOString(),
          };
        }),

      setConfirmToken: (token: string): void => set({ confirmToken: token }),
      clearConfirmToken: (): void => set({ confirmToken: null }),
    }),
    {
      name: "token-storage",
      partialize: (state) => ({
        token: state.token,
        expiresAt: state.expiresAt,
        confirmToken: state.confirmToken,
      }),
    }
  )
);

export default useTokenStore;
