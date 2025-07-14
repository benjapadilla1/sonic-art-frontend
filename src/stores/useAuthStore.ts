import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false,

  login: (token: string) => {
    localStorage.setItem('auth_token', token);
    set({ token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, isLoggedIn: false });
  },
}));
