import { LogObject } from '@/components/pages/auth/AuthForm';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'react-toastify';

export async function login({ email, password }: LogObject) {
  const loginFunction = useAuthStore.getState().login;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Error de login');

  const { token } = await res.json();
  localStorage.setItem('auth_token', token);
  toast.success('Inicio de sesión exitoso', { autoClose: 2000 });
  loginFunction(token);
}
