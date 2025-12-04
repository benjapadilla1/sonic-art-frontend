'use client';

import { useAuthInitialize } from '@/hooks/useAuthInitialize';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  useAuthInitialize();
  return <>{children}</>;
}
