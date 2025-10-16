'use client';

import { CreateCourse } from '@/components/pages/admin/courses/create/CreateCourse';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/useAuthStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CreateCoursePage = () => {
  const router = useRouter();
  const { token, fetchAdminStatus } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      if (!token) {
        router.push('/acceso');
        return;
      }

      await fetchAdminStatus();
      const { isLoggedIn, isAdmin } = useAuthStore.getState();

      if (!isLoggedIn) {
        router.push('/acceso');
        return;
      }

      if (!isAdmin) {
        router.push('/');
        return;
      }

      setLoading(false);
    };

    verifyAccess();
  }, [token, router, fetchAdminStatus]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="mx-auto mb-6 max-w-4xl">
        <Link href="/admin">
          <Button variant="outline" className="navy-button flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Button>
        </Link>
      </div>
      <CreateCourse />
    </div>
  );
};

export default CreateCoursePage;
