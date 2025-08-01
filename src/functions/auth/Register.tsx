import { LogObject } from '@/components/pages/auth/AuthForm';
import { toast } from 'react-toastify';

export async function register({ email, password }: LogObject) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Error de registro');

  const { token } = await res.json();
  localStorage.setItem('auth_token', token);
  toast.success('Registro exitoso', { autoClose: 2000 });
}
