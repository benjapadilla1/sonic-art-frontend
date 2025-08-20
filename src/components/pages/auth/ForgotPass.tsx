'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.success('Se ha enviado un mail para restablecer su contraseña');
    } else {
      toast.error('Ha ocurrido un error al enviar el mail para restablecer su contraseña');
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="text-xl font-bold">Recuperar contraseña</h1>
        <input
          type="email"
          value={email}
          placeholder="Tu email"
          onChange={e => setEmail(e.target.value)}
          className="rounded border p-2"
          required
        />
        <Button type="submit">Enviar correo</Button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
