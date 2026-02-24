import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  accessToken?: string;
  refreshToken?: string;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  setTokens: async ({ accessToken, refreshToken }) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ accessToken: undefined, refreshToken: undefined });
  }
}));
