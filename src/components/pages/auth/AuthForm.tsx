'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/functions/auth/Login';
import { register } from '@/functions/auth/Register';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

type AuthMode = 'login' | 'register';

export interface LogObject {
  email: string;
  password: string;
  captcha: any;
}

interface AuthFormProps {
  mode?: AuthMode;
}

export const AuthForm = ({ mode = 'login' }: AuthFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.info('Por favor confirma que no sos un robot.');
      return;
    }

    if (mode === 'login') {
      await login({ ...form, captcha: captchaToken });
      router.push('/');
    } else {
      await register({ ...form, captcha: captchaToken });
      router.push('/');
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
      <h2 className="font-engravers mb-6 text-center text-2xl font-bold text-gray-800">
        {mode === 'login' ? 'Iniciar sesión' : 'Crear una cuenta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={token => setCaptchaToken(token)}
        />

        <Button type="submit" className="w-full rounded-md px-4 py-2">
          {mode === 'login' ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        {mode === 'login' ? (
          <div className="flex justify-center gap-1">
            ¿No tenés cuenta?
            <Link
              href="/registro"
              className="cursor-pointer font-semibold text-black underline hover:underline"
            >
              Registrate
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-1">
            ¿Ya tenés cuenta?
            <Link
              href="/acceso"
              className="cursor-pointer font-semibold text-black hover:underline"
            >
              Iniciá sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
