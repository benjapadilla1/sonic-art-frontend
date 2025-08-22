'use client';

import { handleGoogleLoginSuccess } from '@/functions/auth/googleLoginSuccess';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function GoogleLoginButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => handleGoogleLoginSuccess(credentialResponse, router)}
      onError={() => {
        toast.error('Error iniciando sesión con Google');
      }}
    />
  );
}
