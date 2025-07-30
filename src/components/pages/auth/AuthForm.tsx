'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/functions/auth/Login';
import { register } from '@/functions/auth/Register';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AuthMode = 'login' | 'register';

export interface LogObject {
  email: string;
  password: string;
}

interface AuthFormProps {
  mode?: AuthMode;
}

export const AuthForm = ({ mode = 'login' }: AuthFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(form);
      router.push('/');
    } else {
      register(form);
      router.push('/');
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
      <h2 className="font-engravers mb-6 text-center text-2xl font-bold text-gray-800">
        {mode === 'login' ? 'Iniciar sesión' : 'Crear una cuenta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 text-sm text-black"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 text-sm text-black"
          required
        />
        <Button type="submit" className="w-full rounded-md px-4 py-2">
          {mode === 'login' ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        {mode === 'login' ? (
          <div className="flex justify-center gap-2">
            ¿No tenés cuenta?{' '}
            <Link
              href="/registro"
              className="cursor-pointer font-semibold text-black underline hover:underline"
            >
              Registrate
            </Link>
          </div>
        ) : (
          <>
            ¿Ya tenés cuenta?{' '}
            <Link
              href="/acceso"
              className="cursor-pointer font-semibold text-black hover:underline"
            >
              Iniciá sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
