'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';

/**
 * Hook to initialize auth state and set up auto token refresh
 * Call this in your root layout or app component
 */
export function useAuthInitialize() {
  const { token, fetchAdminStatus, refreshAuthToken } = useAuthStore();

  useEffect(() => {
    // Initialize auth state on mount
    if (token) {
      fetchAdminStatus();
    }

    // Set up token refresh every 50 minutes (tokens expire after 1 hour)
    const refreshInterval = setInterval(
      async () => {
        const currentToken = useAuthStore.getState().token;
        if (currentToken) {
          console.log('Auto-refreshing auth token...');
          await refreshAuthToken();
        }
      },
      50 * 60 * 1000
    ); // 50 minutes

    return () => clearInterval(refreshInterval);
  }, [token, fetchAdminStatus, refreshAuthToken]);
}
