import { useAuthStore } from '@/stores/useAuthStore';
import { CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
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
    const { data } = await axios.post<{ token: string }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
      { idToken }
    );

    const login = useAuthStore.getState().login;
    const fetchAdminStatus = useAuthStore.getState().fetchAdminStatus;

    login(data.token);

    await fetchAdminStatus();

    toast.success('Login exitoso');
    router.push('/');
  } catch (err) {
    console.error(err);
    toast.error('No se pudo iniciar sesión con Google');
  }
}
