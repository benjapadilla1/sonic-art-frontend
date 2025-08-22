import { create } from 'zustand';

interface User {
  uid: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
}

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin?: boolean;
  fetchAdminStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false,
  user: null,

  login: (token: string) => {
    localStorage.setItem('auth_token', token);
    set({ token, isLoggedIn: true });
    get().fetchAdminStatus();
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, isLoggedIn: false, user: null });
  },

  fetchAdminStatus: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }

      const data = await response.json();
      set({ user: data, isLoggedIn: true, isAdmin: data.isAdmin });
    } catch (error) {
      console.error('No se pudo obtener el usuario:', error);
      set({ user: null, isLoggedIn: false, token: null });
      localStorage.removeItem('auth_token');
    }
  },
}));
