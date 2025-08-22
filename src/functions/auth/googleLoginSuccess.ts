import { CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export async function handleGoogleLoginSuccess(
  credentialResponse: CredentialResponse,
  router: ReturnType<typeof useRouter>
): Promise<void> {
  const idToken = credentialResponse.credential;
  if (!idToken) {
    toast.error('No se recibió un token de Google');
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      throw new Error('Error en la autenticación');
    }

    const data: { token: string } = await res.json();
    localStorage.setItem('auth_token', data.token);
    toast.success('Login exitoso');
    router.push('/');
  } catch (err) {
    console.error(err);
    toast.error('No se pudo iniciar sesión con Google');
  }
}
