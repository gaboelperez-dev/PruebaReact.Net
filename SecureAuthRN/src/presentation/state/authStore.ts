import { create } from 'zustand';
import { SecureStorageAdapter } from '@infra/adapters/SecureStorageAdapter';
import { User } from '@domain/entities/User';

const storage = new SecureStorageAdapter();
const TOKEN_KEY = 'auth_token';

type State = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
  hydrateFromStorage: () => Promise<void>;
};

export const useAuthStore = create<State>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async (token, user) => {
    await storage.set(TOKEN_KEY, token);
    set({ token, user, isAuthenticated: true });
  },
  logout: async () => {
    await storage.remove(TOKEN_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
  setUser: (u) => set({ user: u }),
  hydrateFromStorage: async () => {
    const token = await storage.get(TOKEN_KEY);
    if (token) set({ token, isAuthenticated: true });
  }
}));
