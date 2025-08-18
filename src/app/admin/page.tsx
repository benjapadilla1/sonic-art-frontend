'use client';

import { CoursesCard } from '@/components/pages/admin/courses/CoursesCard';
import { SamplePacks } from '@/components/pages/admin/samplePacks/SamplePacks';
import UsersDashboard from '@/components/pages/admin/users/UsersDashboard';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {
  const router = useRouter();
  const { isLoggedIn, isAdmin, fetchAdminStatus } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/acceso');
      return;
    }

    if (!isAdmin) {
      fetchAdminStatus().then(() => {
        if (!isAdmin) router.push('/');
      });
    }
  }, [isLoggedIn, isAdmin, router, fetchAdminStatus]);

  return (
    <div className="bg-background flex min-h-screen flex-col pt-20">
      <CoursesCard />
      <SamplePacks />
      <UsersDashboard />
    </div>
  );
};

export default AdminPage;
