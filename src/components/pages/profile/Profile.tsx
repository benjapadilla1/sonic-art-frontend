'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface User {
  uid: string;
  displayName?: string;
  email: string;
  phone?: string;
  bio?: string;
  purchaseHistory?: string[];
  createdAt?: { _seconds: number; _nanoseconds: number };
  isAdmin?: boolean;
}

export default function Profile() {
  const { user } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!formData || !user) return;
    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.uid}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      });
      toast.success('Perfil actualizado');
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      toast.error('Error al guardar cambios');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>No se encontró el usuario</p>;

  return (
    <div className="w-full max-w-xl rounded-2xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Perfil de Usuario</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="displayName">Nombre</Label>
          <Input
            id="displayName"
            name="displayName"
            value={formData?.displayName || ''}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Email (solo lectura) */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={formData?.email || ''} disabled />
        </div>

        {/* Fecha de creación */}
        {formData?.createdAt && (
          <div>
            <Label>Cuenta creada</Label>
            <p className="font-medium">
              {new Date(formData.createdAt._seconds * 1000).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Historial de compras */}
        {formData?.purchaseHistory && formData.purchaseHistory.length > 0 && (
          <div>
            <Label>Historial de Compras</Label>
            <ul className="list-disc pl-5 text-sm">
              {formData.purchaseHistory.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        {editMode ? (
          <>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)}>Editar perfil</Button>
        )}
      </div>
    </div>
  );
}
