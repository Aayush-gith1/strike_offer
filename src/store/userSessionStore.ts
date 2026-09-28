import { create } from "zustand";
import type { UserSession } from "@/types";

interface SessionStoreState {
  isAuthenticated: boolean;
  user: UserSession | null;
  isInitialized: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  updateUser: (patch: Partial<UserSession>) => void;
}

export const useUserSession = create<SessionStoreState>((set) => ({
  isAuthenticated: false,
  user: null,
  isInitialized: true,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateUser: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : null,
    })),
}));

export const useUserSessionStore = useUserSession;

// Compatibility alias
export const useAuthStore = (selector?: (state: any) => any) => {
  const store = useUserSession();
  const legacyShape = {
    isLoggedIn: store.isAuthenticated,
    userInfo: store.user,
    setLoggedIn: store.login,
    setLoggedOut: store.logout,
  };
  return selector ? selector(legacyShape) : legacyShape;
};
