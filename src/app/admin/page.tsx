'use client';

import { CoursesCard } from '@/components/pages/admin/courses/CoursesCard';
import { AdminSamplePacks } from '@/components/pages/admin/samplePacks/AdminSamplePacks';
import UsersDashboard from '@/components/pages/admin/users/UsersDashboard';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminPage = () => {
  const router = useRouter();
  const { token, fetchAdminStatus } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        router.push('/acceso');
        return;
      }

      await fetchAdminStatus();

      const { isLoggedIn: updatedLoggedIn, isAdmin: updatedAdmin } = useAuthStore.getState();

      if (!updatedLoggedIn) {
        router.push('/acceso');
        return;
      }

      if (!updatedAdmin) {
        router.push('/');
        return;
      }

      setLoading(false);
    };

    verifyAuth();
  }, [token, router, fetchAdminStatus]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-20">
      <div className="admin-header z-10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display gradient-text-primary text-4xl">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Gestiona cursos, sample packs y usuarios de Sonic Art
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-8">
        <CoursesCard />
        <AdminSamplePacks />
        <UsersDashboard />
      </div>
    </div>
  );
};

export default AdminPage;
