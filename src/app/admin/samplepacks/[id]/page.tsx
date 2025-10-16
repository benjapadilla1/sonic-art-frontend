'use client';

import { EditSamplePack } from '@/components/pages/admin/samplePacks/EditSamplePack';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditSamplePackPage = () => {
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

  const params = useParams();
  const id =
    typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Link className="p-6" href={`/admin`}>
        <Button variant="outline">Volver</Button>
      </Link>
      <EditSamplePack id={id} />
    </div>
  );
};

export default EditSamplePackPage;
