'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Globe, Key, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DataTable } from './UsersTable';

type User = {
  uid: string;
  email: string;
  isAdmin?: boolean;
  provider?: string;
  createdAt?: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <span className="text-primary text-xs font-medium">
            {row.original.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="font-medium">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'isAdmin',
    header: 'Rol',
    cell: ({ row }) => {
      const isAdmin = row.original.isAdmin;
      return (
        <span className={`status-badge ${isAdmin ? 'status-admin' : 'status-user'}`}>
          {isAdmin ? <Shield className="h-3 w-3" /> : <Users className="h-3 w-3" />}
          {isAdmin ? 'Admin' : 'Usuario'}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de Registro',
    cell: ({ row }) => {
      const value = row.original.createdAt;
      return value ? (
        <div className="text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {new Date(value).toLocaleDateString('es-AR')}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'uid',
    header: 'UID',
    cell: ({ row }) => (
      <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
        <Key className="h-4 w-4" />
        <span className="max-w-[120px] truncate">{row.original.uid}</span>
      </div>
    ),
  },
  {
    id: 'provider',
    header: 'Proveedor',
    cell: ({ row }) => {
      const provider = row.original.provider;
      return (
        <div className="text-muted-foreground flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="capitalize">{provider}</span>
        </div>
      );
    },
  },
];

const UsersDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
        if (!res.ok) throw new Error('Error al obtener usuarios');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Users className="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display gradient-text-primary text-3xl">Usuarios</h2>
            <p className="text-muted-foreground mt-1">Cargando datos de usuarios...</p>
          </div>
        </div>
        <div className="data-table p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="bg-muted h-4 w-1/3 animate-pulse rounded" />
                  <div className="bg-muted h-3 w-1/4 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Users className="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display gradient-text-primary text-3xl">Usuarios</h2>
            <p className="text-muted-foreground mt-1">
              Gestiona los {users.length} usuarios registrados en la plataforma
            </p>
          </div>
        </div>

        <div className="hidden gap-4 md:flex">
          <div className="metric-card rounded-lg p-3">
            <div className="text-center">
              <p className="text-primary text-2xl font-bold">
                {users.filter(u => u.isAdmin).length}
              </p>
              <p className="text-muted-foreground text-xs">Admins</p>
            </div>
          </div>
          <div className="metric-card rounded-lg p-3">
            <div className="text-center">
              <p className="text-accent text-2xl font-bold">
                {users.filter(u => !u.isAdmin).length}
              </p>
              <p className="text-muted-foreground text-xs">Usuarios</p>
            </div>
          </div>
        </div>
      </div>

      <div className="data-table">
        <DataTable columns={columns} data={users} />
      </div>
    </section>
  );
};

export default UsersDashboard;
