import { LogObject } from '@/components/pages/auth/AuthForm';
import axios from 'axios';
import { toast } from 'react-toastify';

export async function register({ email, password, displayName, captcha }: LogObject) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      { email, password, displayName, captcha },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    localStorage.setItem('auth_token', data.token);
    toast.success('Registro exitoso', { autoClose: 2000 });
  } catch (error: unknown) {
    console.error('Error en registro:', error);
    throw new Error(
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Error de registro'
    );
  }
}
