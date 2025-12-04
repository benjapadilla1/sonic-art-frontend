import { User } from '@/types/firestore';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
  refreshToken: string | null;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
  isAdmin?: boolean;
  fetchAdminStatus: () => Promise<void>;
  refreshAuthToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false,
  user: null,

  login: (token: string, refreshToken?: string) => {
    localStorage.setItem('auth_token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    set({ token, refreshToken: refreshToken || null, isLoggedIn: true });
    get().fetchAdminStatus();
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    set({ token: null, refreshToken: null, isLoggedIn: false, user: null });
  },

  refreshAuthToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        get().logout();
        return false;
      }

      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
        }
      );

      if (!response.ok) {
        get().logout();
        return false;
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.id_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      set({ token: data.id_token, refreshToken: data.refresh_token });
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      get().logout();
      return false;
    }
  },

  fetchAdminStatus: async () => {
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      // If token expired, try to refresh
      if (response.status === 401) {
        const refreshed = await get().refreshAuthToken();
        if (refreshed) {
          response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else {
          set({ user: null, isLoggedIn: false, token: null });
          return;
        }
      }

      if (!response.ok) {
        set({ user: null, isLoggedIn: false, token: null });
        return;
      }

      const data = await response.json();
      set({ user: data, isLoggedIn: true, isAdmin: data.isAdmin });
    } catch (error) {
      console.error('No se pudo obtener el usuario:', error);
      set({ user: null, isLoggedIn: false, token: null });
    }
  },
}));
