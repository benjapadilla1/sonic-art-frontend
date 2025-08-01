'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DataTable } from './UsersTable';

type User = {
  uid: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isAdmin',
    header: 'Rol',
    cell: ({ row }) => {
      const role = row.original.isAdmin ? 'admin' : 'user';
      return <span className="capitalize">{role}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado el',
    cell: ({ row }) => {
      const value = row.original.createdAt;
      return value ? new Date(value).toLocaleDateString('es-AR') : '-';
    },
  },
  {
    accessorKey: 'uid',
    header: 'UID',
  },
  // {
  //   id: 'actions',
  //   header: 'Acciones',
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <Button variant="outline" size="sm" onClick={() => console.log('Acción para:', user.uid)}>
  //         ...
  //       </Button>
  //     );
  //   },
  // },
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

  if (loading) return <p className="p-4">Cargando usuarios...</p>;

  return (
    <div className="p-4">
      <h1 className="font-engravers mb-4 text-3xl font-bold">Panel de Usuarios</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersDashboard;
